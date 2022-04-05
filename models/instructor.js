//instructor model
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

//creating the schema for the instructors
const instructorSchema = new mongoose.Schema({
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

//generate a json web token for the instructor created
instructorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id, 
        userName:this.userName,
        email:this.email,
    }, 
    config.get('jwtPrivateKey'));
    return token;
}

//creating a mongoose model using the schema
const instructor = mongoose.model('Instructor', instructorSchema);

//funstion to validate the instructor schema
function validateInstructor(instructor) {
    const schema = Joi.object({
        fullName:Joi.string().min(5).max(40).required(),
        userName: Joi.string().min(3).max(10).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(200).required(),
    }).options({ abortEarly: false });

    return schema.validate(instructor);
}

//export the instructor schema module
exports.Instructor = instructor;
//export the validate function
exports.validate = validateInstructor;