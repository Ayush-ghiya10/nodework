const router = require("express").Router();
const cdController = require("../controllers/cdController");
const path = require("path");
const multer = require("multer");
const { DeleteObjectCommand,S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");


const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cntitans",
    acl:'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

router.post(
  "/project/create",
  upload.single("file"),
  cdController.createProject
);
router.post("/project/delete",cdController.deleteProject);
router.post("/project/role/delete",cdController.deleteRole);
router.post("/project/list",cdController.viewProject);


const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'photos', maxCount: 2}])
router.post(
  "/project/role/create",
  cpUpload,
  cdController.createRole
);

module.exports = router;
