const User = require("../models/user");
const Project = require("../models/project");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accountSid = "ACef5f7384cd2eddb614ca4748c44318f4";
const authToken = "b3817c19fb08cc42fc389b5cb0d40409";
const client = require("twilio")(accountSid, authToken);

exports.loginUser = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const existUser = await User.findOne({ email: email.toLowerCase() });
    if (!existUser) throw Error("User is not registered");
    const passwordResult = bcrypt.compare(password, existUser.password);
    if (!passwordResult) throw Error("Write correct email or password");
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { email: existUser.email, userType: existUser.userType },
      },
      "supersecret"
    );
    res.status(200).json({ status: "Success", msg: "Login Success", token });
  } catch (error) {
    res
      .status(403)
      .json({ status: "Failed", msg: "Error", error: error.message });
  }
};
exports.registerUser = async (req, res) => {
  const {
    body: { email, password, userType },
  } = req;

  try {
    if (userType !== "talent") {
      const err = new Error("Not Authenticated");
      err.statusCode = 401;
      throw err;
    }
    const existUser = await User.findOne({ email });
    if (existUser) throw Error("Email already exist");
    const newUser = new User({ email, password });
    const result = await newUser.save();
    if (!result) throw Error("Cannot create user");
    res.status(201).send({ msg: "User created " });
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};

exports.updateNumber = async (req, res) => {
  const {
    body: { countryCode, phoneNumber, email },
  } = req;
  try {
    if (!email) throw Error("email is necessary");
    if (!phoneNumber) throw Error("Please enter a phone number");
    let user = await User.findOne({ email });
    console.log(user);
    let OTP = Math.floor(Math.random() * 9000) + 1000;
    const msg = await client.messages.create({
      body: "OTP is : " + OTP,
      from: "+12184525507",
      to: countryCode + phoneNumber,
    });
    if (msg) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 2,
          data: { OTP, countryCode, phoneNumber, email },
        },
        "supersecret"
      );
      await user.save();
      return res.send({ token: token });
    }
  } catch (e) {
    return res.status(503).send({ status: "failed", message: e.message });
  }
};
exports.verifyNumber = async (req, res) => {
  const {
    body: { token, inputOTP },
  } = req;
  try {
    if (!inputOTP) throw Error("OTP is required");
    let decodedToken = await jwt.verify(token, "supersecret");
    const { data: {OTP, countryCode, phoneNumber, email} } = decodedToken;
    const user = await User.findOne({ email });
    console.log(user);
    if (inputOTP != OTP) {
      throw Error("OTP does not match try Again");
    }
    user.phoneNumber = phoneNumber;
    user.countryCode = countryCode;
    user.verified = true;
    await user.save();
    return res.send({ status: "sucess", message: user });
  } catch (e) {
    return res.status(503).send({ status: "failed", message: e.message });
  }
};

exports.listProjects = async (req, res) => {
  try {
    const projectList = await Project.find({});
    if (!projectList) throw Error("No projects here");
    res.status(200).send({ status: "Success", data: projectList });
  } catch (error) {
    res
      .status(403)
      .json({ status: "Failed", msg: "Error", error: error.message });
  }
};
