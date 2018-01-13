const express = require("express");
const route = express.Router();
const auth = require("../controller/auth");
const login = require("../controller/login");
const passport = require("passport");
const userProfile = require('../models/user-model');
const fresherQuestion = require('../models/fresher-Questions');

route.get('/', (req, res) => {
    res.render("../view/index");
});

//Scope APIs
route.get('/auth/facebook', auth.facebookScope);
route.get('/auth/google', auth.googleplusScope);
route.get('/auth/linkedin', auth.linkedinScope);

//Facebook Profile Authentication
route.get('/auth/facebook/redirect', passport.authenticate('facebook',{failureRedirect: '/auth/facebook'}),auth.facebookAuth);

//Google Profile Authentication
route.get('/auth/google/redirect', passport.authenticate('google',{failureRedirect: '/auth/google'}), auth.googleplusAuth);

//LinkedIn Profile Authentication
route.get('/auth/linkedin/redirect', passport.authenticate('linkedin',{failureRedirect: '/auth/linkedin'}), auth.linkedInAuth);

//Login Page
route.get('/signup', login.loginPage);

route.get('/auth/google/profile',auth.profile);
route.get('/auth/facebook/profile',auth.profile);
route.get('/auth/linkedin/profile',auth.profile);

route.post('/profile/updatedetails',(req,res)=>{
    // fresherQuestion.find((err,data)=>{
    //     if (!err){
    //         // res.render("../view/questionnaire",{
    //         //     questions : questions
    //         // });
    //         res.send("Hiiii");
    //         console.log(")))))))))))))))))))))))))))))))))");
    //         console.log(data);
    //     }
    //     else{
    //         res.send("err");
    //     }
    // });

    fresherQuestion.find({}, function(err, docs) {
        if (!err){
            console.log(docs.questions_Array[0].UserName);
            res.send(docs);
        }
  });
});

module.exports = route;