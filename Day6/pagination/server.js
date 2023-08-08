const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectRouter = require('./routes/project');
const userRouter = require('./routes/user');
require('dotenv').config();




const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use('/project',projectRouter);
app.use('/',userRouter);
mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log("connected");
  })
  .catch((err) => {
    console.log("Not able to connect");
    console.log(err);
  });

