
import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()
const MONGO_URI = process.env.MONGO_URI; 

// Database Connection Function
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connection Successful');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        // Exit process with failure
        process.exit(1);
    }
    
};
