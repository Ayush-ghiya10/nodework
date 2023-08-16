const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SendWelcomeEmail, resetPassword } = require("../utills/emailer");

exports.registerUser = async (req, res) => {
  try {
    const {
      body: { displayName, email, password },
    } = req;
    const existUser = await User.findOne({ email: email.toLowerCase() });
    if (existUser) throw Error("Email already exist");
    const user = new User({ displayName, email, password });
    const result = await user.save();
    const emailResult = await SendWelcomeEmail(email, displayName);
    console.log(emailResult);
    res.status(200).send({ msg: "User Created", result });
  } catch (error) {
    res.status(500).send({ msg: "Error", error: error.message });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const {
      body: { email },
    } = req;
    const existUser = await User.findOne({ email: email.toLowerCase() });

    if (!existUser) throw Error("User is not registered");
    const token = await jwt.sign(
      {
        data: email,
      },
      process.env.SECRET_KEY
    );
    const link =
      req.protocol + "://" + req.get("host") + "/forgotPassword?token=" + token;
    const emailResult = await resetPassword(existUser.displayName, email, link);
    console.log(emailResult);
    res.status(200).send({ msg: "Reset password initiated" });
  } catch (error) {
    res.status(500).send({ msg: "Error", error: error.message });
  }
};
