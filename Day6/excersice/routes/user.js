const router = require('express').Router();
const userController = require('../controllers/user');



router.post('/register',userController.registerUser);
router.post('/resetPassword',userController.resetPassword);  
router.post('/verifyToken',userController.verifyToken);
router.post('/updatePassword',userController.updatePassword);


module.exports = router;