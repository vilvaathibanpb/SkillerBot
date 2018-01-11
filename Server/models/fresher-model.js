const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var fresherDetailsSchema = new Schema(
    {
        user_id : String,
        questions_Array : {
            type:Array
        }
    });

var fresherProfile = mongoose.model("fresherProfile",fresherDetailsSchema);

module.exports = fresherProfile;