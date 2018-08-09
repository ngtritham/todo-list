const express = require('express');
const userControllers = require('../controllers/userController');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/auth/login');
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  console.log("Run ensureAuthenticated");
  if (req.isAuthenticated()) {
    console.log("Đã xác thực");
    return next();
  }
  console.log("Chưa xác thực");
  res.redirect('users/login')
}

router.get('/', ensureAuthenticated, (req, res, next) => {
  res.send(req.user);
});

router.get('/profile', ensureLoggedIn, userControllers.getProfile);

router.get('/login', userControllers.getLogin);

router.get('/signup', userControllers.getSignup);

module.exports = router;
