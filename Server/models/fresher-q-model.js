const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var fresherQuestionsSchema = new Schema(
    {
        intent: {
            type: String,
            required: true,
            unique: true
        },
        question: {
            type: String,
            required: true,
            unique: true
        },

    });

var fresherQuestion = mongoose.model("fresherQuestion",fresherQuestionsSchema);

module.exports = fresherQuestion;