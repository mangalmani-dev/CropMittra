import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { sendEmail } from "../libs/mail.js";
import crypto from "crypto"



export const signup=async(req,res)=>{
     const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
    }

    const allowedRoles = ['Farmer', 'Distributor', 'Retailer'];
    if (!allowedRoles.includes(role)) {
         return res.status(400).json({ message: 'Invalid role specified. Choose from Farmer, Distributor, or Retailer.' });
    }
    try {
        const userExist=await User.findOne({email})
        if(userExist){
                return res.status(409).json({ message: 'A user with this email already exists.' });
        }
            const user = new User({ 
            name, 
            email, 
            password, // Mongoose will automatically hash this before saving
            role 
        });

      
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour in milliseconds
        });
            res.status(201).json({ 
            message: 'Registration successful. Please proceed to login.',
            user: { name: user.name, role: user.role, email: user.email }
        });
    } catch (error) {
        console.error('Signup Error:', error);
    
        res.status(500).json({ message: 'Server error during registration. Please try again.' });
    }

 
} 
export const login=async(req,res)=>{
    
    const {email,password}=req.body
    if(!email||!password){
         return res.status(400).json({ message: 'Please provide both email and password.' });
    }
    try {
        
        const user=await User.findOne({email}).select("+password")
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
              return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Token expires in 1 hour
        );
         res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JS access (XSS defense)
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'strict', // CSRF defense
            maxAge: 3600000 // 1 hour (matches token expiry)
        });
        res.status(200).json({ 
            message: 'Login successful.',
            user: { id: user._id, name: user.name, role: user.role, email: user.email } 
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
} 

export const logout = async (req, res) => {
    try {
        // Simple cookie clear with only required flags (name and HttpOnly)
        res.clearCookie('token', { 
            httpOnly: true,
            path: '/' 
        });
        
        // Send a successful response with the message
        res.status(200).json({ 
            message: 'Successfully logged out. Cookie cleared.' 
        });
        
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ 
            message: 'Server error during logout process.' 
        });
    }
};

// @route   GET /api/auth/me
// @desc    Retrieves basic user data (id and role) from the JWT payload
// @access  Private (Requires authenticateToken middleware)
export const me = async (req, res) => {
    // req.user contains the { id, role } payload decoded from the JWT
    
    try {
        // Send back the data from the token. Status 200 is appropriate for GET.
        res.status(200).json({ 
            user: req.user,
            message: 'User session active.'
        });

    } catch (error) {
        // This catch block is mostly for safety; errors will usually be caught 
        // by the authenticateToken middleware (401/403 errors).
        console.error('Me Endpoint Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
};

// 1. FORGOT PASSWORD - generate and send reset link
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(200).json({ message: 'user not found' });
    }

    try {
        // Generate token and hash it
        const resetToken = crypto.randomBytes(20).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Save hashed token and expiration
        user.resetPasswordToken = tokenHash;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save({ validateBeforeSave: false });

        // Create reset URL
        const resetUrl = `${req.protocol}://${req.get('host')}/api/reset-password/${resetToken}`;

        // Email message
        const message = `You (or someone else) requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you didn't request this, ignore this email.`;

        // Send email (make sure sendEmail is properly implemented)
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: message
        });

        res.status(200).json({ message: 'If a user exists, a reset link has been sent to their email.' });

    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500).json({ message: 'Failed to send email. Try again later.' });
    }
};

export const resetPassword=async(req,res)=>{
  const { token } = req.params;
    const { password } = req.body;

    // Hash token
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching reset token and not expired
    const user = await User.findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired.' });
    }

    // Set new password and clear reset fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    

    
    res.status(200).json({ message: 'Password has been reset successfully.' });
} 
