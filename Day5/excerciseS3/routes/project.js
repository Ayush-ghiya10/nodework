const router = require("express").Router();
const projectController = require("../controllers/project");
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const AWS = require('aws-sdk');
const { S3Client } = require("@aws-sdk/client-s3");
const region = AWS.config.region;
const multerS3 = require('multer-s3');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const s3 = new AWS.S3({
//   accessKeyId: 'AKIAXSGSUKMN7X4VZL5G',
//   secretAccessKey: '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',
//   region: region,
// });
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'cntitans',
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// });
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
      accessKeyId: 'AKIAXSGSUKMN7X4VZL5G',
      secretAccessKey: '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',
  },
  sslEnabled: false,
s3ForcePathStyle: true,
signatureVersion: 'v4',
});
const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: "cntitans",
      key: function (req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
      },
  }),
});
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  return cb(null, true);
};

// const upload = multer({ storage, fileFilter: imageFilter });
router.get("/createProject", (req, res) => {
  res.sendFile(
    path.join(
      path.dirname(process.mainModule.filename),
      "views",
      "createProject.html"
    )
  );
});

// router.post(
//   "/create",
//   auth,
//   validate([
//     body("projectName").contains(),
//     body("projectType").contains(),
//     body("numberOfTalentsRequired").isNumeric(),
//     body("description").contains(),
//   ]),
//   projectController.createProject
// );
router.post("/create", upload.single("cover"), projectController.createProject);
router.post("/update", auth, projectController.updateProject);
router.post("/delete", auth, projectController.deleteProject);

module.exports = router;
