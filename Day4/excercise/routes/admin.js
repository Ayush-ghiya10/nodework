const router = require('express').Router();
const adminController = require('../controllers/admin');
const auth = require('../middlewares/auth');
const { body } = require("express-validator");
const validate = require("../middlewares/validate");


router.post('/createCD',auth,validate([
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({min:6}),
    body('about').contains(),
    body('age').isNumeric()
  ]),adminController.createCD);


module.exports = router;