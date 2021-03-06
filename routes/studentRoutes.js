//Creating RESTful apis for the student models

const { Student, validate } = require('../models/student');
const mongoose = require('mongoose');
const _ = require('lodash');
const Joi=require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const validateObjectId=require('../middleware/validateObjectId');
const studentAuthz=require('../middleware/studentAuthz');

//get method to return all students
router.get('/',async(req, res) => {
    const student = await Student
        .find()
        .select('-password')
        .select('-__v')
        .sort('fullName');
    res.send(student);
});

//post method to create a student in the signup
router.post('/signup', async(req,res) => {
    //error 400 if the student already exist in the database
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let student=await Student.findOne({email:req.body.email});
    if(student){
        return res.status(400).send("The Email is already registered");
    }
    
    let un=await Student.findOne({userName:req.body.userName});
    if(un){
        return res.status(400).send("The Username is already registered");
    }

    //create new student
    student = new Student({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email:req.body.email,
        password:req.body.password
    });

    //bcrypt the pw of the student 
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);

    try {
        student = await student.save();
        res.send(student);
    } catch (ex) {
        console.log(ex.message);
    }
});

//put method to update data for a student
router.put('/update/:id',studentAuthz,async(req,res) => {
    //error 400 if the student already exist
    const {error}=validateStudentPut(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let student=await Student.findOne({email:req.body.email});
    if(student){
        return res.status(400).send("User with the same Email has already registered");
    }
    
    let un=await Student.findOne({userName:req.body.userName});
    if(un){
        return res.status(400).send("User with the same Username has already registered");
    }

    //bcrypt the new pw of the student
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(req.body.password, salt);

    const studentUpdate = await Student.findByIdAndUpdate(
        req.params.id,
        {
            fullName: req.body.fullName,
            // userName: req.body.userName,
            // email:req.body.email,
            password:newPassword
        },{
            new:true
        }
    );

    
    if(!studentUpdate){
        return res.status(400).send("Invalid User");
    }

    res
        .send(studentUpdate)
        .select('-password')
        .select('-__v');


});

//get method to return data of a student
router.get('/:id',validateObjectId,async(req,res) => {
    const student= await Student
        .findById(req.params.id)
        .select('-password')
        .select('-__v');

    if (!student) {
        return res.status(404).send('The ID was not found');
    }
    res.send(student);
})

//function validate the student schema
function validateStudentPut(req) {
    const schema = Joi.object({
        fullName: Joi.string().min(5).max(40).required(),
        password: Joi.string().min(8).max(200).required()
    }).options({ abortEarly: false });

    return schema.validate(req);
}

//export the student router module
module.exports=router;