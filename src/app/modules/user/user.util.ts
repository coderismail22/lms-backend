// TODO: Generate Dynamic ID for SuperAdmin (Optional)[Need 1 more function to find out the last superAdminId]
// TODO: Generate Dynamic ID for Admin[Need 1 more function to find out the last adminId]
// TODO: Generate Dynamic ID for Student[Need 1 more function to find out the last studentId]
// TODO: Generate Dynamic ID for Teacher[Need 1 more function to find out the last teacherId]
import nodemailer from "nodemailer";
import config from "../../config";
// generateOTP
export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// sendVerificationEmail
export const sendVerificationEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email_address,
      pass: config.email_password,
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
  });
};
