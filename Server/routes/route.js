const express = require("express");
const route = express.Router();
const auth = require("../controller/auth");
const login = require("../controller/login");
const chat = require("../controller/chat");
const passport = require("passport");
const userProfile = require('../models/user-model');
const fresherQuestion = require('../models/fresher-Questions');
const fresherProfile = require('../models/fresher-model');


route.get('/', (req, res) => {
    res.render("../view/index");
});

route.get('/bot/:code', chat.startChat);
route.get('/findIntent', chat.chatIntent);
route.get('/findAnswer', chat.chatResponse);

//Scope APIs
route.get('/auth/facebook', auth.facebookScope);
route.get('/auth/google', auth.googleplusScope);
route.get('/auth/linkedin', auth.linkedinScope);

//Facebook Profile Authentication
route.get('/auth/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }), auth.facebookAuth);

//Google Profile Authentication
route.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/auth/google' }), auth.googleplusAuth);

//LinkedIn Profile Authentication
route.get('/auth/linkedin/redirect', passport.authenticate('linkedin', { failureRedirect: '/auth/linkedin' }), auth.linkedInAuth);

//Login Page
route.get('/signup', login.loginPage);

route.get('/auth/google/profile', auth.profile);
route.get('/auth/facebook/profile', auth.profile);
route.get('/auth/linkedin/profile', auth.profile);

route.post('/profile/updatedetails', (req, res) => {
    userProfile.findOneAndUpdate({ '_id': req.query.id }, { 'role': req.body.selectRole }, (err, doc) => {
        if (!err) {
            console.log("Successfully updated");
        }
    });

    var questions = [];

    var intentCollection = "";
    var questionCollection = "";

    switch (req.body.selectRole) {
        case "Fresher":
            intentCollection = fresherQuestion;
            questionCollection = fresherProfile;
            break;
        case "Front-End developer":
            intentCollection = userProfile; // Need to change for FE developer
            questionCollection = userProfile; // Need to change for FE developer
            break;
        default:
            break;
    }
    intentCollection.findOne({}, function (err, docs) {
        if (!err) {
            for (var key_val in docs.questions_Array[0]) {
                questions.push(docs.questions_Array[0][key_val]);
            }
            res.render("../view/questionnaire", {
                questions: questions
            });
        }
    });
});

module.exports = route;