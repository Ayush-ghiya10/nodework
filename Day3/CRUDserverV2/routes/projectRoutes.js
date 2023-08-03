const router = require('express').Router();
const projectControllers = require('../controllers/projectControllers');
router.get('/project/list',projectControllers.listProjects);

module.exports = router;