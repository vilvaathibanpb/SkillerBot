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
    userProfile.findOne({ 'email_id': req.user.email_id }).then((user) => {
        if (user) {
            res.redirect("/auth/google/profile?_id="+ req.user._id);
        }
        else {
            res.send("HIi");
        }
    });
};

exports.linkedInAuth = (req, res) => {
    userProfile.findOne({ 'email_id': req.user.email_id }).then((user) => {
        if (user) {
            res.redirect("/auth/linkedin/profile?_id="+ req.user._id);
        }
        else {
            res.send("HIi");
        }
    });
};

exports.facebookAuth = (req, res) => {
    userProfile.findOne({ 'email_id': req.user.email_id }).then((user) => {
        if (user) {
            res.redirect("/auth/facebook/profile?_id="+ req.user._id);
        }
        else {
            res.send("HIi");
        }
    });
};


exports.profile = (req,res)=>{
    userProfile.findOne({'_id':req.query._id}).then((user)=>{
        if (user){
            res.render("../view/profile", {
                "userName": user.user_name,
                "profileImage":user.image_path
            });
        }
    })
};
