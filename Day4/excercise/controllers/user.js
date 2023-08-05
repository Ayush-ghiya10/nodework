const User = require("../models/user");
const Project = require("../models/project");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
