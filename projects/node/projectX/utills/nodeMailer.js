const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD, 
  },
});
exports.sendVerificationMail = async (email, OTP) => {
  let mailDetails = {
    from: "ayush.ghiya@talentsystems.com",
    to: email,
    subject: "Email verification OTP",
    text: "OTP is : " + OTP,
  };
  transporter.sendMail(mailDetails, async function (err, data) {
    if (err) {
      console.log("Error Occurs");
      existUser.resetToken = null;
      await existUser.save();
    } else {
      console.log("Email sent successfully");
    }
  });
};
