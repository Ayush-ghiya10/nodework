const router = require('express').Router();
const projectController = require('../controllers/project');
const auth = require('../middlewares/auth');
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
router.post('/create',auth,validate([
    body("projectName").contains(),
    body("projectType").contains(),
    body('numberOfTalentsRequired').isNumeric(),
    body('description').contains()
  ]),projectController.createProject);
router.post('/update',auth,projectController.updateProject);
router.post('/delete',auth,projectController.deleteProject);


module.exports = router;