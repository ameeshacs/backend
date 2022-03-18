const Schema = mongoose.Schema;
const mongoose = require('mongoose');
const {answerOptionSchema} = require('../models/answer')

const questionSchema = new Schema({
    exam: { 
        type : new mongoose.Schema({
            name: {
                type: String,
                required: true,
                unique: true,
            },
        }),
        required: true
    },

    question: {
        type: String,
        required: true
    },

    isEnabled: {
        type: Boolean,
        default: true
    },

}, {
    timestamps: true
});

rentalSchema.statics.lookup = function(examId) {
    return this.findOne({
      'exam._id': examId,
    });
  }

const question = mongoose.model('Answer', questionSchema);

exports.questionSchema = questionSchema;
exports.Question = question;