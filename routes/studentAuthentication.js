const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Student}=require('../models/student');

router.post('/', async(req,res) => {
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let student=await Student.findOne({email:req.body.email});
    if(!student){
        return res.status(400).send("Invalid Username or Password");
    }

    const validPassword= await bcrypt.compare(req.body.password,student.password);
    if(!validPassword){
        return res.status(400).send("Invalid Username or Password");
    }

    const token = student.generateAuthToken();
    
    res
        .header("X-auth-token",token)
        .header("access-control-expose-headers","x-auth-token")
        .send(_.pick(student,["_id","userName","email"]));
});


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).required()
    }).options({ abortEarly: false });

    return schema.validate(req);
}

module.exports = router;