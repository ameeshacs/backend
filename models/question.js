const Schema = mongoose.Schema;
const mongoose = require('mongoose');
const {answerOptionSchema} = require('../models/answer')

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [answerOptionSchema],
    
    answer: {
      type: Number,
      required: true
    },

    isEnabled: {
        type: Boolean,
        default: true
    },

}, {
    timestamps: true
});

const question = mongoose.model('Answer', questionSchema);

exports.questionSchema = questionSchema;
exports.Question = question;