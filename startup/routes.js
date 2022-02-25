const path=require('path');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');

const student=require('../routes/studentRoutes');
// const instructor=require('../routes/instructorRoutes')
// const userAuth=require('../Routes/userAuthentication');

const error=require('../middleware/error');

module.exports=function(app){
    app.use(express.json());
    app.use('/api/student',cors(),student);
    // app.use('/api/instructor',cors(),instructor);
    // app.use('/api/user/login',cors(),userAuth);
    app.use(error);
}