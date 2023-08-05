const router = require("express").Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  
  userController.loginUser
);
router.post("/register", userController.registerUser);
router.get("/getlist", auth, userController.listProjects);
module.exports = router;
