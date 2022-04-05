//route module
// const path=require('path');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');

//requiring all route files
const student=require('../routes/studentRoutes');
const instructor=require('../routes/instructorRoutes')
const studentAuth=require('../routes/studentAuthentication');
const instructorAuth=require('../routes/instructorAuthentication');
// const exam=require('../routes/examRoutes');

const error=require('../middleware/error');

module.exports=function(app){
    //process data sent throught the http request body
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({
        extended:true
    }))
    app.use(express.json());
    //assigning seperate apis for each route to avoid collision
    app.use('/api/student',cors(),student);
    app.use('/api/instructor',cors(),instructor);
    app.use('/api/student/login',cors(),studentAuth);
    app.use('/api/instructor/login',cors(),instructorAuth);
    // app.use('/api/exam',cors(),exam);
    app.use(error);
}