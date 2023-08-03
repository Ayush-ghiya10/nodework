const { v4: uuidv4 } = require("uuid");
const Project = require("../models/project");

exports.createProject = (req, res) => {
  const {
    body: { title, description },
  } = req;
  const id = uuidv4();
  if (!title) return res.status(422).send({status :"failed",message:"Title is required"});
  const newProject = new Project(id, title, description);

  newProject.save((result) => {
    if (!result)
      return res
        .status(422)
        .send({ status: "failed", message: "Unable to create the project." });
    res.send({ status: "success", data: result });
  });
};

exports.updateProject = (req, res) => {
  const {
    body: { title, description },
    params: { id },
  } = req;
  console.log(id, title, description);

  Project.update(id, title, description, (data) => {
    if (!data) {
      return res
        .status(422)
        .send({ status: "failed", message: "Project does not exist." });
    }
    res.send({ status: "update successfull", updatedData:data });
  });
};

exports.deleteProject = (req, res) => {
  const {
    params: { id },
  } = req;
  Project.delete(id, (data) => {
    if (!data) {
      return res
        .status(422)
        .send({ status: "failed", message: "Project does not exist." });
    }
    res.send({ status: "deleted successfull", deletedData : data });
  });
};
