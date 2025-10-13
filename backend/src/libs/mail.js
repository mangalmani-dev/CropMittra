import nodemailer from 'nodemailer'
import dotenv from "dotenv"


const transporter = nodemailer.createTransport({
    // Example using a common service like SendGrid, Mailgun, or even Gmail (with an App Password)
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (options) => {
 const mailOptions = {
        from: process.env.EMAIL_FROM, // Your app's sending address
        to: options.to,
        subject: options.subject,
        html: options.message,      // your HTML message
        text: options.text || options.message.replace(/<\/?[^>]+(>|$)/g, "") // plain text fallback (strip HTML tags)
    };
    await transporter.sendMail(mailOptions);
};