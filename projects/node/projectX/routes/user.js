const router = require('express').Router();
const auth = require('../auth/isAuth');
const userController = require('../controllers/userController');

router.post('/login',userController.loginUser);
router.post('/register',userController.registerUser);
router.post('/verifyUser',userController.verifyUser);
router.post('/updatePassword',userController.updatePassword);
router.post('/listfields',auth,userController.listFields)

module.exports = router;