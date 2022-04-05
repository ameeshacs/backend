//unit testing for the authorization module for the student in middleware
const {Student} = require('../../../models/student');
const auth = require('../../../middleware/studentAuthz');
const mongoose = require('mongoose');

//requesting a jwt  to the student authoriztion test module
describe ('auth middleware', () => {
    it('should populate req.student with payload of a valid JWT', () =>{
        const student = {
            _id:mongoose.Types.ObjectId().toHexString()
        };
        const token = new Student(student).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.student).toMatchObject(student);
    });
});