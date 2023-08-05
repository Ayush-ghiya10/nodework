const router = require('express').Router();
const adminController = require('../controllers/admin');
const auth = require('../middlewares/auth');


router.post('/createCD',auth,adminController.createCD);


module.exports = router;