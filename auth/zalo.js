const request = require('request');
const sha256 = require('sha256');
const querystring = require("querystring");
const fs = require("fs");
const JSONBigInt = require('json-bigint-string');
const config = require('../configuration/config');

class zaloApp {
	constructor() {
		try {
			this.appId = config.oauth.zalo.clientID;
			this.secretKey = config.oauth.zalo.clientSecret;
			this.redirectURI = 'http://localhost:3000/';
			this.isUsingProxy = true;
		} catch (e) {
			return console.log(e);
		}
	};

	//@set using proxy on server when run production
	setUsingProxy(is_using) {
		this.isUsingProxy = is_using;
	};

	getAccessTokenProfile(code, callback) {
		let url_api = 'https://oauth.zaloapp.com/v3/access_token';
		let proxy = this.proxy;
		let appid = this.appId;
		let secret_key = this.secretKey;
		let redirect_uri = this.redirectURI;

		let data_string = "app_id=" + querystring.escape(appid) + "&app_secret=" + querystring.escape(secret_key) + "&code=" + querystring.escape(code) + "&redirect_uri=" + redirect_uri;
		let url_post = url_api + "?" + data_string;
		let options = {
			url: url_post,
			method: "GET"
		};

		if (this.isUsingProxy == true) {
			options.proxy = this.proxy;
		}

		request(options, function (error, response, body) {
			if (error) {
				return callback(error, null);
			}
			//systemLog.debug(response,'response');
			if (response && response.statusCode == 200) {
				try {
					return callback(null, JSONBigInt.parse(body));
				} catch (e1) {
					return callback(e1.message, null);
				}
			} else {
				return callback(null, null);
			}
		});
	};
	getProfileUserByAccessToken(access_token = '', callback) {
		let url_api = 'http://graph.zalo.me/v2.0/me';
		let proxy = this.proxy;
		let fields = 'id,name,gender,picture,birthday,userIdByOA';
		let data_string = "access_token=" + querystring.escape(access_token) + "&fields=" + fields;
		let url_post = url_api + "?" + data_string;
		let options = {
			url: url_post,
			method: "GET"
		};

		if (this.isUsingProxy == true) {
			options.proxy = this.proxy;
		}

		request(options, function (error, response, body) {
			if (error) {
				return callback(error, null);
			}
			if (response && response.statusCode == 200) {
				try {
					return callback(null, JSONBigInt.parse(body));
				} catch (e1) {
					return callback(e1.message, null);
				}
			} else {
				return callback(null, null);
			}
		});
	}
}

module.exports = zaloApp;