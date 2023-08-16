const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const cdRouter = require('./routes/cd');
const auth = require('./auth/isAuth');
const adminAuth = require('./auth/adminAuth');
const cdAuth = require('./auth/cdAuth');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',userRouter);
app.use('/admin',auth,adminAuth,adminRouter);
app.use('/cd',auth,cdAuth,cdRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("Error", err);
  });
