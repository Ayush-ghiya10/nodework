const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user'); 
const projectRouter = require('./routes/project');
const adminRouter = require('./routes/admin');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use('/',userRouter);
app.use('/project',projectRouter);
app.use('/admin',adminRouter);


mongoose.connect('mongodb+srv://ayushghiya:Ayushghiya1@cluster0.ncog1vc.mongodb.net/new').then(()=>{
    app.listen(3000);
    console.log('Connected!!');
}).catch((err)=>{
    console.log('Error : '+ err);
})

