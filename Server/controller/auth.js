const passport = require("passport");


exports.fbAuth = (req,res)=>{
    res.send("This is the FB Page");
};

//Scope page for google +
exports.googleplusScope = passport.authenticate('google',{
    scope:['profile']
});

//scope page for Linkedin
exports.linkedinScope = passport.authenticate('linkedin',{
    scope:['r_basicprofile','r_emailaddress']
});
