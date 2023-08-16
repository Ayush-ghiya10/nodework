const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/signup',userController.registerUser);
router.post('/forgotPassword',userController.forgotPassword);


module.exports = router;