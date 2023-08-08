const router = require('express').Router();
const projectController = require('../controllers/project');

router.post('/getProjects',projectController.getProjects);
router.post('/createProjects',projectController.createProjects);


module.exports = router;