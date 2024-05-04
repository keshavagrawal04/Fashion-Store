const nodemailer = require("nodemailer");

const { ADMIN_USER_GMAIL, ADMIN_USER_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: ADMIN_USER_GMAIL,
    pass: ADMIN_USER_PASS,
  },
});

const sendPasswordResetOtp = (to) => {
  const mailOptions = {
    from: ADMIN_USER_GMAIL,
    to: to,
    subject: "Password Reset OTP (One Time Password)",
    html: "<p>OTP (One Time Password)</p>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
