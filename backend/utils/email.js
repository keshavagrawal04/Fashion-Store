const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const { ADMIN_USER_GMAIL, ADMIN_USER_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: ADMIN_USER_GMAIL,
    pass: ADMIN_USER_PASS,
  },
});

const readHtmlTemplate = () => {
  const filePath = path.join(
    __dirname,
    "../templates/forgotPasswordOtpTemplate.html"
  );
  console.log(filePath);
  return fs.readFileSync(filePath, "utf8");
};

const sendPasswordResetOtp = async (to, otp) => {
  const htmlTemplate = readHtmlTemplate();

  const mailOptions = {
    from: ADMIN_USER_GMAIL,
    to: to,
    subject: "Password Reset OTP (One Time Password)",
    html: htmlTemplate.replace("{{otp}}", otp),
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return error;
    } else {
      console.log("Email sent:", info.response);
      return info;
    }
  });
};

module.exports = { sendPasswordResetOtp };
