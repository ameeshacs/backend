//error detection module to detect error
const winston=require('winston');

module.exports=function(){
    winston.error(err.message,err);
    
    res.status(500).send('Failed');
}