const Project = require("../models/project");
const User = require("../models/user");
const superHeroes = require("superheroes");
exports.getProjects = async (req, res) => {
  const {
    body: { offset, limit },
  } = req;
  const skills = req.body.skills.split(",");

  const projects = await Project.find(
    { requiredSkills: { $in: skills } },
    { title: 1, createdBy: 1, requiredSkills: 1 }
  )
    .populate({ path: "createdBy", select: "displayName" })
    .limit(10 || limit)
    .skip(offset)
    .sort({ createdBy: 1, title: 1 });
    const countObject = await Project.countDocuments({requiredSkills: { $in: skills }})
  res.send({Total:countObject,projects:projects});
};

function getRandomSkills(arr, minSize, maxSize) {
  const shuffledArr = arr.sort(() => Math.random() - 0.5);
  const subsetSize =
    Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  return shuffledArr.slice(0, subsetSize);
}
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
// const getRandomSkills = (arr)=>{
//     let randomSkills = [];
//     for (let i = 0; i <= getRandomNumber(2,5); i++) {
//         if(randomSkills.includes(arr[getRandomNumber(0,arr.length)])){

//             randomSkills.push(arr.reverse()[getRandomNumber(0,arr.length)]);
//         }else{
//             randomSkills.push(arr[getRandomNumber(0,arr.length)]);
//         }
//     }
//     return randomSkills;
// }
const getRandomUsers = () => {
  let userArr = [
    "64d23c9f141a8fd978d128b0",
    "64d23cb6141a8fd978d128b3",
    "64d23cce141a8fd978d128b6",
  ];
  return userArr[getRandomNumber(0, 3)];
};
exports.createProjects = async (req, res) => {
  const skillsArr = [
    "gaming",
    "riding",
    "driving",
    "acting",
    "dancing",
    "sleeping",
    "running",
    "shooting",
    "workout",
    "lifting",
    "cooking",
  ];

  let projects = [];
  for (let i = 0; i <= 100; i++) {
    projects.push({
      title: superHeroes.random(),
      createdBy: getRandomUsers(),
      requiredSkills: getRandomSkills(skillsArr, 2, 5),
    });
  }
  console.log(projects);
  const result = await Project.insertMany(projects);
  res.send({ message: "Created " });
};
