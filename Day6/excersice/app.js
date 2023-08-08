const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);

mongoose
  .connect(
    "mongodb+srv://ayushghiya:Ayushghiya1@cluster0.ncog1vc.mongodb.net/new2"
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log("connected");
  })
  .catch((err) => {
    console.log("Not able to connect");
    console.log(err);
  });
