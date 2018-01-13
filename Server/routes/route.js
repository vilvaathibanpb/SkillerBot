const express = require("express");
const route = express.Router();
const auth = require("../controller/auth");
const login = require("../controller/login");
const passport = require("passport");
const userProfile = require('../models/user-model');

route.get('/', (req, res) => {
    res.render("../view/index");
});

route.get('/bot/:code', (req, res) => {
    console.log(req.params);
    res.render("../view/chat", {"code": req.params.code});
});

//Scope APIs
route.get('/auth/facebook', auth.facebookScope);
route.get('/auth/google', auth.googleplusScope);
route.get('/auth/linkedin', auth.linkedinScope);

//Facebook Profile Authentication
route.get('/auth/facebook/redirect', passport.authenticate('facebook'),auth.facebookAuth);

//Google Profile Authentication
route.get('/auth/google/redirect', passport.authenticate('google'), auth.googleplusAuth);

//LinkedIn Profile Authentication
route.get('/auth/linkedin/redirect', passport.authenticate('linkedin'), auth.linkedInAuth);

//Login Page
route.get('/signup', login.loginPage);

route.get('/auth/google/profile',auth.profile);
route.get('/auth/facebook/profile',auth.profile);
route.get('/auth/linkedin/profile',auth.profile);

route.get('/profile/updatedetails',(req,res)=>{
    res.send("Hellooooo ");
});

module.exports = route;