import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_EMAIL_FROM,
    pass: process.env.NEXT_EMAIL_PASSWORD,
  },
});
