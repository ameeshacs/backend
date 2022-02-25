// const { Instructor, validate } = require('../models/instructor');
// const mongoose = require('mongoose');
// const _ = require('lodash');
// const Joi=require('joi');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const instructorRouter = express.Router();

// instructorRouter.get('/',async(req, res) => {
//     const instructor = await Instructor
//         .find()
//         .select('-password')
//         .select('-__v')
//         .sort('fullName');
//     res.send(instructor);
// });

// instructorRouter.post('/signup', async(req,res) => {
//     const {error}=validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     let instructor=await Instructor.findOne({email:req.body.email});
//     if(instructor){
//         return res.status(400).send("User with the same Email has already registered");
//     }
    
//     let un=await Instructor.findOne({userName:req.body.userName});
//     if(un){
//         return res.status(400).send("User with the same Username has already registered");
//     }

//     instructor = new Instructor({
//         fullName: req.body.fullName,
//         userName: req.body.userName,
//         email:req.body.email,
//         password:req.body.password
//     });

//     const salt = await bcrypt.genSalt(10);
//     instructor.password = await bcrypt.hash(instructor.password, salt);

//     try {
//         instructor = await instructor.save();
//         res.send(instructor);
//     } catch (ex) {
//         console.log(ex.message);
//     }
// });

// instructorRouter.put('/update/:id',authz,async(req,res) => {
//     const {error}=validateInstructorPut(req.body);
//     if(error){
//         return res.status(400).send(error.details[0].message);
//     }

//     let instructor=await Instructor.findOne({email:req.body.email});
//     if(instructor){
//         return res.status(400).send("User with the same Email has already registered");
//     }
    
//     let un=await Instructor.findOne({userName:req.body.userName});
//     if(un){
//         return res.status(400).send("User with the same Username has already registered");
//     }

//     const salt = await bcrypt.genSalt(10);
//     newPassword = await bcrypt.hash(req.body.password, salt);

//     const instructorUpdate = await Instructor.findByIdAndUpdate(
//         req.params.id,
//         {
//             fullName: req.body.fullName,
//             // userName: req.body.userName,
//             // email:req.body.email,
//             password:newPassword
//         },{
//             new:true
//         }
//     );

    

//     if(!instructorUpdate){
//         return res.status(400).send("Invalid User");
//     }

//     res
//         .send(instructorUpdate)
//         .select('-password')
//         .select('-__v');


// });

// instructorRouter.get('/:id',validateObjectId,async(req,res) => {
//     const instructor= await Instructor
//         .findById(req.params.id)
//         .select('-password')
//         .select('-__v');

//     if (!instructor) {
//         return res.status(404).send('The ID was not found');
//     }
//     res.send(instructor);
// })

// function validateInstructorPut(req) {
//     const schema = Joi.object({
//         fullName: Joi.string().min(5).max(40).required(),
//         password: Joi.string().min(8).max(20).required()
//     }).options({ abortEarly: false });

//     return schema.validate(req);
// }


// module.exports=instructorRouter;