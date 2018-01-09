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
        callbackURL: '/api/auth/linkedin/redirect',
        clientID: keys.linkedIn.clientID,
        clientSecret: keys.linkedIn.clientSecret,
        scope: ['r_basicprofile', 'r_emailaddress']
    },
        (accessToken, refreshToken, profile, done) => {
            userProfile.findOne({ email_id: profile.emails[0].value }).then((currentUser) => {
                if (currentUser) {
                    console.log("UserAlreadyExists");
                    done(null, profile);
                }
                else {
                    new userProfile({
                        user_name: profile.displayName,
                        email_id: profile.emails[0].value,
                        //mobile : String,
                        image_path: profile.photos[0].value,
                        // account_status: false,
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
        callbackURL: '/api/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
        (accessToken, refreshToken, profile, done) => {
            console.log("google profile");
            done(null, profile);
        })
);