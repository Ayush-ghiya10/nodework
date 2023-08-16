const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/field/create',adminController.createField);
router.post('/field/update',adminController.updateField);
router.post('/field/delete',adminController.deleteField);
router.post('/verifyCD',adminController.verifyCD);


module.exports = router;