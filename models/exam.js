const Schema = mongoose.Schema;
const mongoose = require('mongoose');
const {questionSchema} = require('../models/question')

const examSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    instructions: {
        type: String,
        required: true
    },

    isEnabled: {
        type: Boolean,
        default: true
    },

    questions: [questionSchema],

    duration :{
      hours : {
        type : Number,
        default: 0
      },

      minutes : {
        type : Number,
        default: 0
      },

      seconds : {
        type : Number,
        default: 0
      }

    }
}, {
    timestamps: true
});

const exam = mongoose.model('Exam', examSchema);

exports.Exam = exam;
