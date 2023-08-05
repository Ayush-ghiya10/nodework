const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", userRouter);

mongoose
  .connect(
    "mongodb+srv://ayushghiya:Ayushghiya1@cluster0.ncog1vc.mongodb.net/titanNetworks"
  )
  .then(() => {
    app.listen(3000);
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect to DB");
  });
