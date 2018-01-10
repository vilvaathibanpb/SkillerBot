const passport = require("passport");
const userProfile = require('../models/user-model');

//Scope page for google +
exports.googleplusScope = passport.authenticate('google',{
    scope:['profile','email']
});

//scope page for Linkedin
exports.linkedinScope = passport.authenticate('linkedin',{
    scope:['r_basicprofile','r_emailaddress']
});

//scope page for FaceBook
exports.facebookScope = passport.authenticate('facebook',{
    scope:['r_basicprofile','r_emailaddress']
});

exports.googleplusAuth = (req, res) => {
    userProfile.findOne({'email_id': req.user.email_id},(err,data)=>{
        if (!err){
            res.redirect("/auth/google/profile?_id="+ req.user._id);
        }
        else{
            res.send("err");
        }
    });
};

exports.linkedInAuth = (req, res) => {
    userProfile.findOne({ 'email_id': req.user.email_id }, (err, data) => {
        if (!err) {
            if (req.user.account_status) {
                res.send("Existing user");
            }
            else {
                res.redirect("/auth/linkedin/profile?_id=" + req.user._id);
            }
        }
        else {
            res.send("err");
        }
    });
};

exports.facebookAuth = (req, res) => {
    userProfile.findOne({'email_id': req.user.email_id},(err,data)=>{
        if (!err){
            res.redirect("/auth/facebook/profile?_id="+ req.user._id);
        }
        else{
            res.send("err");
        }
    });
};

exports.profile = (req, res) => {
    userProfile.findOne({'_id': req.query._id},(err,data)=>{
        if (!err){
            res.render("../view/profile", {
                "userName": data.user_name,
                "profileImage":data.image_path,
                "userid":data._id
            });
        }
        else{
            res.send("err");
        }
    });
};
