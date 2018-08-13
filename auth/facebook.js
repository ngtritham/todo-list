const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/userModel');
const config = require('../configuration/config');

passport.use(new FacebookStrategy({
        clientID: config.oauth.facebook.clientID,
        clientSecret: config.oauth.facebook.clientSecret,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['email', 'gender', 'locale', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        User.loadUserById(profile.id)
            .then(user => {
                //console.log("USER: ", user)
                if (user.length < 1) {
                    //console.log("Khong có userid: ", profile.id);

                    const id = profile.id;
                    const fullname = profile.displayName;
                    const email = profile._json.email;
                    const avatar = 'http://graph.facebook.com/' + id + '/picture?type=square';
                    const access_token = accessToken;
                    const provider = profile.provider;

                    const newUser = {
                        id: id,
                        fullname: fullname,
                        email: email,
                        avatar: avatar,
                        acces_token: access_token,
                        provider: provider
                    }
                    User.add(id, fullname, email, avatar, access_token, provider)
                        .then(result => {
                            //console.log("Lưu user thành công");
                            //console.log("newUser: ", newUser);
                            done(null, newUser);
                        })
                        .catch(error => {
                            //console.log("Lỗi lưu user");
                            done(null, false);
                        });
                } else {
                    const formatedUser = {
                        "id": user[0].id,
                        "fullname": user[0].fullname,
                        "email": user[0].email,
                        "avatar": user[0].avatar,
                        "acces_token": user[0].access_token,
                        "provider": user[0].provider
                    }
                    done(null, formatedUser);
                    //console.log("Có user ", formatedUser);
                }

            })
            .catch((error) => {
                //console.log(error);
                done(null, error)
            });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user_id, done) => {
    User.loadUserById(user_id)
        .then(result => {
            let user = false;
            if(result.length < 1) {
                return done(null, user);
            } else {
                user = {
                    "id": result[0].id,
                    "fullname": result[0].fullname,
                    "email": result[0].email,
                    "avatar": result[0].avatar,
                    "acces_token": result[0].access_token,
                    "provider": result[0].provider
                }

                return done(null, user);
            }
        })
        .catch(error => {
            return done(null, false);
        });
});

module.exports = passport;