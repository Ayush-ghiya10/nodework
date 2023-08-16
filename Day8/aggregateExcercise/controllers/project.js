const Project = require("../models/project");


exports.listProjects = async (req, res) => {
  const {
    body: { limit, offset },
  } = req;
  const projects = await Project.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);

  res.json({ status: "success", data: projects });
};