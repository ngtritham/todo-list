const express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var sha256 = require('sha256');
var querystring = require("querystring");
const router = express.Router();
const passportFacebook = require('../auth/facebook');
const zalo_app = require('../auth/zalo');
const zalo = require('../auth/zalo');
const userControllers = require('../controllers/userController');
const config = require('../configuration/config');
const userModel = require('../models/userModel');

/* LOGIN ROUTER */
router.get('/login', userControllers.getLogin);

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
	res.redirect('/#');
});

router.get('/zalo/callback', (req, res) => {
	try {
		let url_parts = url.parse(req.url, true);
		let query = url_parts.query;
		let code = query.code;
		var zaloApp = new zalo_app();
		zaloApp.getAccessTokenProfile(code, function (err, result) {
			if (err || !result) {

				return res.redirect(config.baseURL);
				// console.log("Lỗi getAccessTokenProfile:", err);
			} else {
				// console.log("Lấy được result:", result);
			}

			let access_token = result.access_token;
			zaloApp.getProfileUserByAccessToken(access_token, function (err, profile) {
				if (err) {
					console.log("Lỗi getProfileUserByAccessToken: ", err);
					return res.redirect(config.baseURL);
				}
				if (profile) {
					//console.log("PROFILE: ", profile);
					try {
						var user = {
							id: profile.id,
							name: profile.name,
							email: "",
							avatar: profile.picture.data.url,
							access_token: access_token,
							provider: 'zalo'
							// gender: profile.gender,
							// birthday: profile.birthday,
						};

						userModel.loadUserById(user.id)
							.then(result => {
								// console.log("Kết quả tìm user id : ", user.id);
								// console.log(result);
								if(result.length < 1){
									//console.log("Không có user, thêm user");
									userModel.add(user.id, user.name, user.email, user.avatar, user.access_token, user.provider)
									.then(result => {
										console.log("Thêm user thành công !!!");
									})
									.catch(error => {
										console.log("Thêm user thất bại !!!");
										// console.log("Lỗi: ", error);
									});
								} else {
									console.log("CÓ user id : ", user.id);
								}
							})
							.catch(error => {
								console.log("Lỗi load user");
								console.log(error);
							});
					} catch (e1) {
						console.log("Fail load database");
						return res.redirect(config.baseURL);
					}
				} else {
					// return res.redirect(config.baseURL);
					console.log("Khong co profile !!!!");
				}
			});
		});
	} catch (error) {
		// return res.redirect(appConfig.baseUrl);
		console.log("Lỗi route /zalo/calback: ", error);
	}
});

module.exports = router;