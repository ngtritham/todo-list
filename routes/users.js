const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', userControllers.getLogin);

router.get('/signup', userControllers.getSignup);

module.exports = router;
