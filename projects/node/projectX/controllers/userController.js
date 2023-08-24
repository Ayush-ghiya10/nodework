const User = require("../models/mainModels/user");
const Notification = require("../models/mappingModels/notification");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const { SendWelcomeEmail } = require("../utills/emailer");
const nodemailer = require("nodemailer");
const ethnicityOperations = require("../utills/ethnicityOperations");
const genderOperations = require("../utills/genderOperations");
const locationOperations = require("../utills/locationOperations");
const projectTypeOperations = require("../utills/projectTypeOperations");
const roleTypeOperations = require("../utills/roleTypeOperations");
const skillOperations = require("../utills/skillOperations");
const unionOperations = require("../utills/unionOperations");



const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,   //passord can be saved in .env file
  },
});

exports.loginUser = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const existUser = await User.findOne({ email: email.toLowerCase() });
    if (!existUser) throw Error("User is not registered");
    if (!existUser.verified) throw Error("User is not verified");
    if ((existUser.userType = "cd" && existUser.forcePasswordReset == true))
      throw Error("Password update is required for CD to login");

    const passwordResult = await bcrypt.compare(
      password,
      existUser.passwordHash
    );
    if (!passwordResult) throw Error("Email or password is incorrect");
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          email: existUser.email,
          userType: existUser.userType,
          verified: existUser.verified,
          userId: existUser.userId
        },
      },
      process.env.SECRET_KEY
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
    body: {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      allowNotifications,
      acknowledgement,
      workLocation,
      userType = "talent",
    },
  } = req;
  try {         //throw error of userType is not cd too
    if (userType != "cd" && !password) throw Error("Password is required");
    if (!acknowledgement)
      throw Error("Please accept terms and conditions in order to continue");
    const existUser = await User.findOne({ email: email.toLowerCase() });
    console.log("in exist user");
    if (existUser) throw Error("User is already registered");
    if (allowNotifications) {
      const newNotification = new Notification({
        displayName: `${firstName} ${lastName}`,
        email,
      });
      const notificationResult = await newNotification.save();
      if (!notificationResult) throw Error("Error in setting up notification");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId: uuidv4(),
      firstName,
      lastName,
      passwordHash: hashedPassword,
      email: email.toLowerCase(),
      mobileNo,
      userType,
      workLocation,
    });
    let token;
    if (newUser.userType == "talent") {
      const verificationOTP = await otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { email: newUser.email, verified: newUser.verified },
        },
        process.env.SECRET_KEY
      );
      newUser.OTP = verificationOTP;

      //send verification email using sendgrid
      let mailDetails = {
        from: "ayush.ghiya@talentsystems.com",
        to: email,
        subject: "Email verification OTP",
        text: `"OTP is : + ${verificationOTP} and your token is 
        ${token}`,
      };
      transporter.sendMail(mailDetails, async function (err, data) {
        if (err) {
          console.log("Error Occurs");
          newUser.OTP = null;
          await newUser.save();
        } else {
          console.log("Email sent successfully");
        }
      });
    }

    const result = await newUser.save();
    if (!result) throw Error("Error while creating account");

    res
      .status(202)
      .send({ message: "user sucessfully created", data: result, token });
  } catch (error) {
    return res
      .status(401)
      .send({ status: "failed", message: error.message, error });
  }
};

exports.verifyUser = async (req, res) => {
  const {
    body: { token, OTP },
  } = req;

  try {
    if (!OTP) throw Error("Otp is required to verify your email");
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const {
      data: { email, verified },
    } = decodedToken;
    const existUser = await User.findOne({ email });
    if (!existUser) throw Error("User is not created.Try Again");
    if (verified == true) throw Error("User is already verified");
    if (existUser.OTP != OTP)
      throw Error("OTP does not match please try again");
    existUser.verified = true;
    existUser.OTP = null;
    await existUser.save();
    let displayName = `${existUser.firstName} ${existUser.lastName}`;
    await SendWelcomeEmail(email, displayName);
    res.status(200).json({ status: "Success", msg: "User is verified" });
  } catch (error) {
    return res
      .status(401)
      .send({ status: "failed", message: error.message, error });
  }
};

exports.updatePassword = async (req, res) => {
  const {
    body: { email, oldPassword, newPassword },
  } = req;
  try {
    if (!oldPassword || !newPassword || !email)
      throw Error("All fields are required");
    const existUser = await User.findOne({ email });
    if (!existUser.forcePasswordReset)
      throw Error("Password is already updated");
    if (!(await bcrypt.compare(oldPassword, existUser.passwordHash)))
      throw Error("Old is password is incorrect");
    if (await bcrypt.compare(newPassword, existUser.passwordHash))
      throw Error("New password should be different");
    existUser.passwordHash = await bcrypt.hash(newPassword, 10);
    existUser.forcePasswordReset = false;
    await existUser.save();
    return res
      .status(200)
      .send({ status: "Success", message: "Password is updated" });
  } catch (error) {
    return res.status(401).send({ status: "Failed", message: error.message });
  }
};


exports.listFields = async (req, res) => {
  const {
    query: { fieldName, fieldId },
  } = req;
  try {
    const operationType = 'view';
    let result;
    switch (fieldName) {
      case "ethnicity":
        result = await ethnicityOperations(fieldName,operationType, fieldId);
        break;
      case "gender":
        result = await genderOperations(fieldName,operationType, fieldId);
        break;
      case "location":
        result = await locationOperations(fieldName,operationType, fieldId);
        break;
      case "projectType":
        result = await projectTypeOperations(fieldName,operationType, fieldId);
        break;
      case "roletype":
        result = await roleTypeOperations(fieldName,operationType, fieldId);
        break;
      case "skill":
        result = await skillOperations(fieldName,operationType, fieldId);
        break;
      case "union":
        result = await unionOperations(fieldName,operationType, fieldId);
        break;

      default:
        break;
    }
    res.status(201).send( result );
  } catch (error) {
    res.status(403).send({ status: "Failed", message: error.message });
  }
};