const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const userProfile = require('../models/user-model');

passport.serializeUser(
    function (user, done) {
        done(null, user.id);
    }
);

passport.deserializeUser(
    function (id, done) {
        User.findById(id).then(
            function (user) {
                done(null, user);
            }
        )
    }
);

passport.use(
    new LinkedInStrategy({
        callbackURL: '/auth/linkedin/redirect',
        clientID: keys.linkedIn.clientID,
        clientSecret: keys.linkedIn.clientSecret,
        scope: ['r_basicprofile', 'r_emailaddress']
    },
        (accessToken, refreshToken, profile, done) => {
            userProfile.findOne({ email_id: profile.emails[0].value }).then((currentUser) => {
                if (currentUser) {
                    done(null, profile);
                }
                else {
                    new userProfile({
                        user_name: profile.displayName,
                        email_id: profile.emails[0].value,
                        //mobile : String,
                        image_path: profile.photos[0].value,
                        account_status: false,
                        profile_url: profile._json.url
                        // url_code : String,
                        // role : String

                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                }
            });
        }));


passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
        (accessToken, refreshToken, profile, done) => {
            console.log("**********Authentication");
            userProfile.findOne({ email_id: profile.emails[0].value }).then((currentUser) => {
                if (currentUser) {
                    done(null, profile);
                }
                else {
                    new userProfile({
                        user_name: profile.displayName,
                        email_id: profile.emails[0].value,
                        //mobile : String,
                        image_path: profile.photos[0].value,
                        account_status: false,
                        // url_code : String,
                        // role : String
                        profile_url: profile._json.url

                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                }
            });
        }));