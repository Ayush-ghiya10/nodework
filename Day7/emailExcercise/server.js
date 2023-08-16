const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use('/',userRouter);


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(process.env.PORT);
    console.log('Connected');
}).catch(err=>{
    console.log('Error', err);
})


