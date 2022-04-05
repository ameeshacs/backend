//unit testing for the student model
const {Student} = require('../../../models/student');
const jwt = require('jsonwebtoken');
const config = require('config');
const  mongoose = require('mongoose');

//should return a valid jwt token for the student model for it to be successfull
describe('student.generateAuthToken',() => {
    it('should return a valid JWT token',() =>{
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString()
        };
        const student = new Student(payload);
        const token = student.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});