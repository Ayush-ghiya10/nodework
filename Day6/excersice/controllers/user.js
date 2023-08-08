const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: "ayush.ghiya@talentsystems.com",
    pass: "ivzgxxtbtjshfemq",
  },
});

exports.registerUser = async (req, res) => {
  const {
    body: { username, email, password },
  } = req;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) throw Error("Email already exist");
    const newUser = new User({ username, email, password });
    const result = await newUser.save();
    if (!result) throw Error("Cannot create user");
    res.status(201).send({ msg: "User created " });
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  const {
    body: { email },
  } = req;

  try {
    console.log(Math.floor(Date.now() / 1000) + 120 * 60);
    const existUser = await User.findOne({ email });
    if (!existUser) throw Error("User is not registered");
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 120 * 60,
        data: { email: existUser.email, id: existUser.id },
      },
      process.env.SECRET_KEY
    );
    console.log("in reset password");
    existUser.resetToken = token;
    await existUser.save();
    let mailDetails = {
      from: "ayush.ghiya@talentsystems.com",
      to: email,
      subject: "Password Update Response",
      text: "token is : " + token,
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

    res
      .status(200)
      .json({ status: "Success", msg: "Reset Password Initiated", token });
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};
exports.verifyToken = async (req, res) => {
  const {
    body: { token },
  } = req;
  try {
    if (!token) throw Error("Token is required");
    let decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const {
      data: { email, id },
    } = decodedToken;
    const user = await User.findOne({ email });
    if (user.resetToken != token) throw Error("Token is not correct");
    res.status(200).json({ status: "Success", msg: "Token Verified", token });
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};
exports.updatePassword = async (req, res) => {
  const {
    body: { token, newPassword },
  } = req;
  try {
    if (!token) throw Error("Token is required");
    let decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const {
      data: { email, id },
    } = decodedToken;
    const user = await User.findOne({ email });
    user.password = newPassword;
    user.resetToken = null;
    await user.save();
    res
      .status(200)
      .json({ status: "Success", msg: "Password Reset Success", user });
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};
