const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },

    userName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:10
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
      },
});

studentSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id, 
        userName:this.userName,
        email:this.email,
    }, 
    config.get('jwtPrivateKey'));
    return token;
}
const student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    const schema = Joi.object({
        fullName:Joi.string().min(5).max(40).required(),
        userName: Joi.string().min(3).max(10).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(20).required(),
    }).options({ abortEarly: false });

    return schema.validate(student);
}

exports.Student = student;
exports.validate = validateStudent;
