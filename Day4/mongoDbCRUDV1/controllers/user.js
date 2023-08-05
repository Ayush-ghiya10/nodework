const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signUp = (req, res) => {
  const {
    body: { email, password },
  } = req;
  if (!email || !password) {
    return res
      .status(500)
      .send({ status: "Failed", message: "Email and password is required" });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(402)
        .send({ status: "Failed", message: "Email is already registered" });
    }
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const newUser = new User({ email: email, password: hashedPassword });

        newUser
          .save()
          .then((result) => {
            res
              .status(201)
              .send({ status: "Success", message: "User created" });
          })
          .catch((err) => {
            res
              .status(500)
              .send({ status: "Failed", message: "Some error occured", err });
          });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Unable to hashed password",
          err,
        });
      });
  });
};

exports.login = (req, res) => {
  const {
    body: { email, password },
  } = req;
  if (!email || !password)
    return res
      .status(500)
      .send({ status: "Failed", message: "Email and password is required" });

  User.findOne({ email }).then((user) => {
    bcrypt.compare(password, user.password).then((checkedPassword) => {
      if (!checkedPassword) {
        return res
          .status(500)
          .send({ status: "Failed", message: "Wrong Password" });
      }
      return res.status(200).send({
        message: "Login Succesfull",
      });
    });
  });
};
