//unit testing for the instructor model
const {Instructor} = require('../../../models/instructor');
const jwt = require('jsonwebtoken');
const config = require('config');
const  mongoose = require('mongoose');

//should return a valid jwt token for the instructor model for it to be successfull
describe('instructor.generateAuthToken',() => {
    it('should return a valid JWT token',() =>{
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString()
        };
        const instructor = new Instructor(payload);
        const token = instructor.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});