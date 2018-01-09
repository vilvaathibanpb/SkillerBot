const express = require("express");
const route = express.Router();
const auth = require("../controller/auth");
const login = require("../controller/login");
const passport = require("passport");


route.get('/',(req,res)=>{
    res.render("../view/index");
});

//Scope APIs
route.get('/auth/facebook',auth.fbAuth);
route.get('/auth/google',auth.googleplusScope);
route.get('/auth/linkedin',auth.linkedinScope);

//Authentication APIs
route.get('/auth/facebook/redirect',auth.fbAuth);

//Need to check
route.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.send("We hve reached the google callback");
});

route.get('/auth/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>{
    res.send("We hve reached the linkedin callback");
});


route.get('/signup',login.loginPage);

module.exports = route ;