const Project = require("../models/project");

exports.createProject = async (req, res) => {
  const {
    body: { projectName, projectType, numberOfTalentsRequired,description },
    payload: { email, userType },
  } = req;

  try {
    if (userType !== "cd") {
      const err = new Error("Not Authenticated");
      err.statusCode = 401;
      throw err;
    }
    const existProject = await Project.findOne({
      projectName: projectName.toLowerCase(),
    });
    console.log(existProject);
    if (existProject) {
      const err = new Error("Project already exist");
      err.statusCode = 403;
      throw err;
    }
    const newProject = new Project({
      projectName,
      projectType,
      numberOfTalentsRequired,
      description,
      creatorEmail: email,
    });
    const result = await newProject.save();
    if (!result) throw Error("Cannot create Project");
    res.status(201).json({ msg: "Project created " ,data:result});
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};

exports.updateProject = async(req, res) => {
  const {
    body,
    payload: { userType },
    query:{id}
  } = req;


  try {
    
    if (!(userType == 'cd' || userType == 'admin')) {
      const err = new Error("Not Authenticated");
      err.statusCode = 401;
      throw err;
    }
    const result = await Project.findOneAndUpdate({id},body,{new:true});
    res.send(result);
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};

exports.deleteProject=async(req,res)=>{
    const {
        body,
        payload: { userType },
        query:{id}
      } = req;
    try {
        if (!(userType == 'cd' || userType == 'admin')) {
          const err = new Error("Not Authenticated");
          err.statusCode = 401;
          throw err;
        }
        const result = await Project.findOneAndDelete({id});
        res.send(result);
      } catch (error) {
        res.status(500).send({ msg: "Error ", error: error.message });
      }
}
