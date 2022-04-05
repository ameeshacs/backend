//Creating RESTful apis for the intructor models

const { Instructor, validate } = require('../models/instructor');
const mongoose = require('mongoose');
const _ = require('lodash');
const Joi=require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const validateObjectId=require('../middleware/validateObjectId');
const authz=require('../middleware/Authorization');

//get method to return all instructors
router.get('/',async(req, res) => {
    const instructor = await Instructor
        .find()
        .select('-password')
        .select('-__v')
        .sort('fullName');
    res.send(instructor);
});

//post method to create a instructor in the signup
router.post('/signup', async(req,res) => {
    //error 400 if the instructor already exist in the database
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let instructor=await Instructor.findOne({email:req.body.email});
    if(instructor){
        return res.status(400).send("User with the same Email has already registered");
    }
    
    let un=await Instructor.findOne({userName:req.body.userName});
    if(un){
        return res.status(400).send("User with the same Username has already registered");
    }

    //create new intructor
    instructor = new Instructor({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email:req.body.email,
        password:req.body.password
    });

    //bcrypt the pw of the instructor
    const salt = await bcrypt.genSalt(10);
    instructor.password = await bcrypt.hash(instructor.password, salt);

    try {
        instructor = await instructor.save();
        res.send(instructor);
    } catch (ex) {
        console.log(ex.message);
    }
});

//put method to update data for a instructor
router.put('/update/:id',authz,async(req,res) => {
    //error 400 if the instructor already exist
    const {error}=validateInstructorPut(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let instructor=await Instructor.findOne({email:req.body.email});
    if(instructor){
        return res.status(400).send("User with the same Email has already registered");
    }
    
    let un=await Instructor.findOne({userName:req.body.userName});
    if(un){
        return res.status(400).send("User with the same Username has already registered");
    }

    //bcrypt the new pw of the relevant instructor
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(req.body.password, salt);

    const instructorUpdate = await Instructor.findByIdAndUpdate(
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

    

    if(!instructorUpdate){
        return res.status(400).send("Invalid User");
    }

    res
        .send(instructorUpdate)
        .select('-password')
        .select('-__v');


});

//get method to return data of a instructor
router.get('/:id',validateObjectId,async(req,res) => {
    const instructor= await Instructor
        .findById(req.params.id)
        .select('-password')
        .select('-__v');

    if (!instructor) {
        return res.status(404).send('The ID was not found');
    }
    res.send(instructor);
})

//function to validate the instructor schema
function validateInstructorPut(req) {
    const schema = Joi.object({
        fullName: Joi.string().min(5).max(40).required(),
        password: Joi.string().min(8).max(200).required()
    }).options({ abortEarly: false });

    return schema.validate(req);
}


//export the router module of the instructor
module.exports=router;