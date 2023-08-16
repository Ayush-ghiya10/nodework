const router = require('express').Router()

const projectController = require('../controllers/project')

router.post('/create', projectController.createProject)
router.post('/list', projectController.list)

module.exports = router