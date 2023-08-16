const bcrypt = require("bcrypt");
const ethnicityOperations = require("../utills/ethnicityOperations");
const genderOperations = require("../utills/genderOperations");
const locationOperations = require("../utills/locationOperations");
const projectTypeOperations = require("../utills/projectTypeOperations");
const roleTypeOperations = require("../utills/roleTypeOperations");
const skillOperations = require("../utills/skillOperations");
const unionOperations = require("../utills/unionOperations");
const User = require("../models/mainModels/user");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: "ayush.ghiya@talentsystems.com",
    pass: "ivzgxxtbtjshfemq",                           //credentials can be kept in .env file
  },
});

exports.verifyCD = async (req, res) => {
  const {
    body: { id },
  } = req;
  try {
    const existUser = await User.findOne({ userId: id });
    if (!existUser) throw Error("User is not registered");
    if (!existUser.userType == "cd") throw Error("User is not a CD");
    if (existUser.verified) throw Error("User is already verified");

    let mailDetails = {            //common mail credentials can be kept in configs or .env file
      from: "ayush.ghiya@talentsystems.com",
      to: existUser.email,
      subject: "Sasta CN credentials",
      text: `Your username is : ${existUser.email}
    Your password is : Casting@1`,
    };
    transporter.sendMail(mailDetails, async function (err, data) {
      if (err) {
        console.log("Error Occurs");
        existUser.forcedPasswordReset = false;
        existUser.verified = false;
        await existUser.save();
      } else {
        existUser.forcePasswordReset = true;
        existUser.verified = true;
        existUser.passwordHash = await bcrypt.hash("Casting@1", 10);
        console.log("Email sent successfully");
        await existUser.save();
      }
    });
    res.status(200).json({ status: "Success", msg: "verification Success" });
  } catch (error) {
    res
      .status(403)
      .json({ status: "Failed", msg: "Error", error: error.message });
  }
};

exports.createField = async (req, res) => {
  const {
    query: { fieldName, fieldId, fieldValue },
  } = req;
  try {
    let result;
    switch (fieldName) {
      case "ethnicity":
        result = await ethnicityOperations(fieldValue, "create");
        break;
      case "gender":
        result = await genderOperations(fieldValue, "create");
        break;
      case "location":
        result = await locationOperations(fieldValue, "create");
        break;
      case "projectType":
        result = await projectTypeOperations(fieldValue, "create");
        break;
      case "roletype":
        result = await roleTypeOperations(fieldValue, "create");
        break;
      case "skill":
        result = await skillOperations(fieldValue, "create");
        break;
      case "union":
        result = await unionOperations(fieldValue, "create");
        break;
      default:
        break;
    }
    res.status(201).send({ data: result });
  } catch (error) {
    res.status(403).send({ status: "Failed", message: error.message });
  }
};

exports.updateField = async (req, res) => {
  const {
    query: { fieldName, fieldId, fieldValue },
  } = req;
  try {
    let result;
    switch (fieldName) {
      case "ethnicity":
        result = await ethnicityOperations(fieldValue, "update", fieldId);
        break;
      case "gender":
        result = await genderOperations(fieldValue, "update", fieldId);
        break;
      case "location":
        result = await locationOperations(fieldValue, "update", fieldId);
        break;
      case "projectType":
        result = await projectTypeOperations(fieldValue, "update", fieldId);
        break;
      case "roletype":
        result = await roleTypeOperations(fieldValue, "update", fieldId);
        break;
      case "skill":
        result = await skillOperations(fieldValue, "update", fieldId);
        break;
      case "union":
        result = await unionOperations(fieldValue, "update", fieldId);
        break;

      default:
        break;
    }
    res.status(201).send({ data: result });
  } catch (error) {
    res.status(403).send({ status: "Failed", message: error.message });
  }
};
exports.deleteField = async (req, res) => {
  const {
    query: { fieldName, fieldId, fieldValue },
  } = req;
  try {
    let result;
    switch (fieldName) {
      case "ethnicity":
        result = await ethnicityOperations(fieldValue, "delete", fieldId);
        break;
      case "gender":
        result = await genderOperations(fieldValue, "delete", fieldId);
        break;
      case "location":
        result = await locationOperations(fieldValue, "delete", fieldId);
        break;
      case "projectType":
        result = await projectTypeOperations(fieldValue, "delete", fieldId);
        break;
      case "roletype":
        result = await roleTypeOperations(fieldValue, "delete", fieldId);
        break;
      case "skill":
        result = await skillOperations(fieldValue, "delete", fieldId);
        break;
      case "union":
        result = await unionOperations(fieldValue, "delete", fieldId);
        break;

      default:
        break;
    }
    res.status(201).send({ data: result });
  } catch (error) {
    res.status(403).send({ status: "Failed", message: error.message });
  }
};
