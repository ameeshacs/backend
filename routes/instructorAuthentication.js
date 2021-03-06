//authentication for the instructor login page

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Instructor}=require('../models/instructor');

//post method for instructor login
router.post('/', async(req,res) => {
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //validations for the instructor login page
    //validations for the email/username
    let instructor=await Instructor.findOne({email:req.body.email});
    if(!instructor){
        return res.status(400).send("Invalid Username or Password");
    }

    //validations for pw 
    const validPassword= await bcrypt.compare(req.body.password,instructor.password);
    if(!validPassword){
        return res.status(400).send("Invalid Username or Password");
    }

    const token = instructor.generateAuthToken();
    
    res
        .header("X-auth-token",token)
        .header("access-control-expose-headers","x-auth-token")
        .send(_.pick(instructor,["_id","userName","email"]));
});

//function to validate the instructor schema
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).required()
    }).options({ abortEarly: false });

    return schema.validate(req);
}

module.exports = router;