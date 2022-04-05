//unit testing for the authorization module for the instructor in middleware
const {Instructor} = require('../../../models/instructor');
const auth = require('../../../middleware/Authorization');
const mongoose = require('mongoose');

//requesting a jwt  to the instructor authoriztion test module
describe ('auth middleware', () => {
    it('should populate req.instructor with payload of a valid JWT', () =>{
        const instructor = {
            _id:mongoose.Types.ObjectId().toHexString()
        };
        const token = new Instructor(instructor).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.instructor).toMatchObject(instructor);
    });
});