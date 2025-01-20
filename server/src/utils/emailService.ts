// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER, // Your email
//     pass: process.env.EMAIL_PASS, // App password
//   },
// });

// export const sendOtpEmail = async (email: string, otp: string) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'OTP for Verify',
//     html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//         <h1 style="color: #b4457f; font-size: 24px; font-weight: bold; margin-top: 0;">BookMyVenue</h1>
//           <h2 style="color: #4a4a4a;">Your One-Time Password</h2>
//           <p style="font-size: 16px; color: #666;">Use the following OTP to complete your action:</p>
//           <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; color: #333; border-radius: 3px;">
//             ${otp}
//           </div>
//           <p style="font-size: 14px; color: #888; margin-top: 20px;">This OTP will expire in 10 minutes.</p>
//         </div>
//       `,
//   };
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('OTP sent to email');
//   } catch (err) {
//     console.error('Error sending OTP:', err);
//   }
// };

 