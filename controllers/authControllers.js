const url = require('url');
const sha256 = require('sha256');
const querystring = require("querystring");
const config = require('../configuration/config');
const userModel = require('../models/userModel');
const zalo_app = require('../auth/zalo');

const authConntrollers = {
    loginZalo: (req, res) => {
        try {
            let url_parts = url.parse(req.url, true);
            let query = url_parts.query;
            let code = query.code;
            const zaloApp = new zalo_app();
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
                            const user = {
                                id: profile.id,
                                fullname: profile.name,
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
                                    if (result.length < 1) {
                                        //console.log("Không có user, thêm user");
                                        userModel.add(user.id, user.fullname, user.email, user.avatar, user.access_token, user.provider)
                                            .then(result => {
                                                console.log("Thêm user thành công !!!");
                                                req.session.user = user;
                                                req.session.isLogged = true;
                                                res.redirect('/');
                                            })
                                            .catch(error => {
                                                console.log("Thêm user thất bại !!!");
                                                return new Error;
                                                // console.log("Lỗi: ", error);
                                            });
                                    } else {
    
                                        // console.log("CÓ user id : ", user.id);
                                        // console.log(user);
                                        req.session.user = user;
                                        req.session.isLogged = true;
                                        console.log(req.session.user);
                                        res.redirect('/');
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
    }
}

module.exports = authConntrollers;