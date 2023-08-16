const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',userRouter)
app.use('/project', projectRouter)

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log("Connected to Database!")
        app.listen(process.env.PORT)
    })
    .catch(err => {
        console.log(err)
    })