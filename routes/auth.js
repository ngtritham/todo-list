const express = require('express');
const router = express.Router();
const passportFacebook = require('../auth/facebook');
const passportGoogle = require('../auth/google');
const passportLocal = require('../auth/local');

const zalo = require('../auth/zalo');
const userControllers = require('../controllers/userController');
const authControllers = require('../controllers/authControllers');
const bodyParser = require('body-parser');

/* LOGIN ROUTER */
router.get('/login', userControllers.getLogin);
//router.post('/login', passportLocal.authenticate('local', { failureRedirect: '/auth/login' }));

/* LOGOUT ROUTER */
router.get('/logout', userControllers.logOut);

/* FACEBOOK ROUTER */
router.get('/facebook', passportFacebook.authenticate('facebook', {
	scope: ['email']
}));

router.get('/facebook/callback', passportFacebook.authenticate('facebook', {
	failureRedirect: '/auth/login'
}), (req, res) => {
	req.session.isLogged = true;
	res.redirect('/');
});

/* GOOGLE ROUTER*/
router.get('/google', passportGoogle.authenticate('google'));

router.get('/google/callback', passportGoogle.authenticate('google', {
	failureRedirect: '/login'
}), (req, res) => {
	req.session.isLogged = true;
	res.redirect('/');
});


// ZALO ROUTER 
router.get('/zalo/callback', authControllers.loginZalo);




module.exports = router;