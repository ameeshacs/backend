const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Exam} = require("../models/exam");

const examRouter = express.Router();
examRouter.use(bodyParser.json());

examRouter.route('/')
    .post((req, res, next) => {
        const {error}=validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let exams=await Exams.findOne({name:req.body.name});
        if(exams){
            return res.status(400).send("Exam with the same name is already created");
        }

        exams = new Exams({
            name: req.body.name,
            instructions: req.body.instructions,
            duration: req.body.duration,
            password: req.body.password
        });

        // const salt = await bcrypt.genSalt(10);
        // exams.password = await bcrypt.hash(exams.password, salt);

    try {
        exams = await exams.save();
        res.send(exams);
    } catch (ex) {
        console.log(ex.message);
    }
    })
    // .put((req, res, next) => {
    //     res.statusCode = 403 /*Not supported*/
    //     res.end('PUT operation not supported on /quizes');
    // })
    // .delete((req, res, next) => {
    //     Quizes.remove({})
    //         .then((resp) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(resp);
    //         }, (err) => next(err)).catch((err) => next(err));
    // });

module.exports=examRouter;


    

