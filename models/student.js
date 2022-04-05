//student model
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

//creating the schema for the students
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
        maxlength: 200
      },
});

//generate a json web token for the student created
studentSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id, 
        userName:this.userName,
        email:this.email,
    }, 
    config.get('jwtPrivateKey'));
    return token;
}

//creating a mongoose model using the schema of the student
const student = mongoose.model('Student', studentSchema);

//funstion to validate the student schema
function validateStudent(student) {
    const schema = Joi.object({
        fullName:Joi.string().min(5).max(40).required(),
        userName: Joi.string().min(3).max(10).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(200).required(),
    }).options({ abortEarly: false });

    return schema.validate(student);
}

//export the student schema module
exports.Student = student;
//export the validate function of the student
exports.validate = validateStudent;
