const router = require('express').Router();
const projectController = require('../controllers/project');
const auth = require('../middlewares/auth');
router.post('/create',auth,projectController.createProject);
router.post('/update',auth,projectController.updateProject);
router.post('/delete',auth,projectController.deleteProject);


module.exports = router;