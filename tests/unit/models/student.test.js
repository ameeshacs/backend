const {Student} = require('../../../models/student');
const jwt = require('jsonwebtoken');
const config = require('config');
const  mongoose = require('mongoose');

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