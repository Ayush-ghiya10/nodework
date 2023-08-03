const Project = require('../models/project');
exports.listProjects=(req,res)=>{
Project.fetchAll((data)=>{
    res.send(data);
})

}