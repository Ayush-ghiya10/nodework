const express = require('express');
const bodyParser = require('body-parser');
const cdRoutes = require('./routes/cdRoutes');
const projectRoutes = require('./routes/projectRoutes')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use('/cd',cdRoutes);
app.use('/',projectRoutes);




app.listen(3000);