const Project = require("../models/project");
const User = require("../models/user");
const superheroes = require("superheroes");

exports.createProject = async (req, res) => {
  try {
    const skills = [
      "dance",
      "sing",
      "karate",
      "swim",
      "gymnastics",
      "juggling",
    ];

    const user = await User.find({}, { userId: 1 });
    console.log(user);
    const projects = [];
    for (let i = 0; i < 100; i++) {
      let randomSkills = [];
      for (let j = 0; j < 8; j++) {
        let index = Math.round(
          (Math.random() * 10) / 2 + (Math.random() * 10) / 2
        );
        if (index < skills.length && !randomSkills.includes(skills[index])) {
          randomSkills.push(skills[index]);
        }
      }
      projects.push({
        title: superheroes.random(),
        description: "This is a description!",
        createdBy: user[Math.floor((Math.random() * 10 + 1) / 5)],
        skillsRequired: randomSkills,
        published: i % 2 == 0 ? true : false,
      });
    }

    await Project.insertMany(projects);
    res.send({ status: "Success!", message: "Inserted 100 projects!" });
  } catch (e) {
    res.send({ status: "Failed!", message: e.message });
  }
};

exports.list = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      {
        $project: {
          projectDescription: { $concat: ["$title", " - ", "$description"] },
          firstSkill: { $arrayElemAt: ["$skillsRequired", 0] },
          lastSkill: { $arrayElemAt: ["$skillsRequired", -1] },
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          expireDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateAdd: {
                  startDate: "$createdAt",
                  unit: "day",
                  amount: 3,
                },
              },
            },
          },
        },
      },
    ]);

    //Important one
    // const projects = await Project.aggregate([
    //   { $project: { _id: 1,title:1,description:1 } },
    //   {
    //     $merge: {
    //       into: "newTestCollection",
    //       on: "_id",
    //       whenMatched: "replace",
    //       whenNotMatched: "insert",
    //     },
    //   },
    // ]);

    res.send({ status: "Success!", projects });
  } catch (error) {
    res.send({ status: "Failed!", message: error.message });
  }
};
