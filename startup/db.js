const winston=require('winston');
const mongoose = require('mongoose');
const config=require('config');

module.exports=function(){

    const urlDB=config.get('db');
    mongoose.connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => winston.info(`Connected to ${urlDB}...`));
        
}