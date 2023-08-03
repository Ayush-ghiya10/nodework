const express = require("express");
const bodyParser = require('body-parser');

const cdRoute = require('./routes/cdRoute');
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use('/cd',cdRoute);

app.use((req, res, next) => {
    res.status(404).send('Page not found!');
    // res.sendFile('./views/404.html');
    // console.log(__dirname);
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(3000);