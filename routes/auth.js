const express = require('express');
const router = express.Router();
const passportFacebook = require('../auth/facebook');
const userControllers = require('../controllers/userController');
/* LOGIN ROUTER */
router.get('/login', userControllers.getLogin);

/* LOGOUT ROUTER */
router.get('/logout', userControllers.logOut);
/* FACEBOOK ROUTER */
router.get('/facebook', passportFacebook.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback', passportFacebook.authenticate('facebook', { failureRedirect: '/auth/login' }), (req, res) => {
    req.session.isLogged = true;
    res.redirect('/#');
});

module.exports = router;