const router = require('express').Router();
const cdController = require('../controllers/cdControllers');

router.post('/project/create',cdController.createProject);
router.post('/project/update/:id',cdController.updateProject);
router.post('/project/delete/:id',cdController.deleteProject);

module.exports = router;