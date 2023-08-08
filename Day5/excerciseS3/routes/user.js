const router = require("express").Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
router.post(
  "/login",
  validate([
    body("email").isEmail().normalizeEmail(),
    body("password").contains(),
  ]),
  userController.loginUser
);
router.post(
  "/register",validate([
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("userType").contains()]),
  userController.registerUser
);
router.post('/updateNumber',userController.updateNumber);
router.post('/verifyNumber',userController.verifyNumber);
router.get("/getlist", auth, userController.listProjects);
module.exports = router;
