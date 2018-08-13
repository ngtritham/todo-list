const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/userModel');
const config = require('../configuration/config');

passport.use(new GoogleStrategy({
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log("Google accessToken: ", accessToken);
        console.log("GOOGLE refreshToken: ", refreshToken);
        console.log("GOOGLE profile: ", profile);

    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user_id, done) => {
    // User.loadUserById(user_id)
    //     .then(result => {
    //         let user = false;
    //         if(result.length < 1) {
    //             return done(null, user);
    //         } else {
    //             user = {
    //                 "id": result[0].id,
    //                 "fullname": result[0].fullname,
    //                 "email": result[0].email,
    //                 "avatar": result[0].avatar,
    //                 "acces_token": result[0].access_token,
    //                 "provider": result[0].provider
    //             }

    //             return done(null, user);
    //         }
    //     })
    //     .catch(error => {
    //         return done(null, false);
    //     });
});

module.exports = passport;