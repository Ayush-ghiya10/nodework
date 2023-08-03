const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/addProject',(req,res,next)=>{
    const {body:{title,description}} = req;
    const isFilePresent = fs.existsSync('./data/project.txt');
    if(!isFilePresent){
        fs.writeFileSync('./data/project.txt',JSON.stringify([]),err=>console.log(err));
    }else{

        const filedata = JSON.parse(fs.readFileSync('./data/project.txt'));
        filedata.push({title,description});
        fs.writeFile ('./data/project.txt',JSON.stringify(filedata),err=>{
            console.log(err);
            return;
        });   
    }
    res.send('Project added');
});
router.get('/viewProject',(req,res,next)=>{
    const filedata = JSON.parse(fs.readFileSync('./data/project.txt'));
    res.status(201);
    res.json(filedata);
})


module.exports=router;