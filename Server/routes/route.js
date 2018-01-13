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
        if (err) {
            res.send("Not able to update the database");
        }
    });

    var questions = [];
    var userid;

    var intentCollection = "";

    switch (req.body.selectRole) {
        case "Fresher":
            intentCollection = fresherQuestion;
            break;
        case "Front-End developer":
            break;
        default:
            break;
    }
    if (intentCollection.length > 0) {
        intentCollection.findOne({}, function (err, docs) {
            if (!err) {
                for (var key_val in docs.questions_Array[0]) {
                    questions.push(docs.questions_Array[0][key_val]);
                }
                res.render("../view/questionnaire", {
                    questions: questions,
                    userid: req.query.id
                });
            }
            else {
                res.send("Data not present in database");
            }
        });
    }
});


route.post('/profile/Accounts', (req, res) => {
    var userRole = "";
    var intentCollection = "";
    var finalArray = [];

    userProfile.findOne({ '_id': req.query.id }, (err, user) => {
        if (!err) {
            userRole = user.role;
            switch (userRole) {
                case "Fresher":
                    intentCollection = fresherQuestion;
                    break;
                case "Front-End developer":
                    break;
                default:
                    break;
            }

            if (intentCollection.length > 0) {
                intentCollection.findOne({}, function (err, docs) {
                    if (!err) {
                        var counter = 0 ;
                        //Array of response from user from Questionnaire page
                        var userResponse = req.body.userResponse;
                        for (var key_val in docs.questions_Array[0]) {
                            finalArray[key_val] = userResponse[counter];
                            counter = counter + 1 ;
                        }
                        console.log(finalArray);
                        fresherProfile.findOne({ user_id: req.query.id }).then((currentUser) => {
                            if (currentUser) {
                                currentUser.questions_Array.push(finalArray);
                                currentUser.save();
                                console.log("******",currentUser.questions_Array);
                            }
                            else {
                                new fresherProfile({
                                    user_id: req.query.id,
                                    questions_Array: finalArray
                                }).save();
                                console.log("******",finalArray);
                            }

                            userProfile.findOneAndUpdate({ '_id': req.query.id }, { 'account_status': true }, (err, doc) => {
                                if (err) {
                                    res.send("Not able to update the database");
                                }
                            });

                        });
                        res.send("Success");
                    }
                    else {
                        res.send("Data not present in database");
                    }
                });
            }
        }
    });
});

module.exports = route;