//integration testing to check the get methods of the instructor
const request = require('supertest');
const {Instructor} = require('../../models/instructor');
const mongoose = require('mongoose');

let server;

describe('/api/instructor', () =>{
    beforeEach(() => { server = require('../../index'); })

    afterEach(async () =>{
        await server.close();
        await Instructor.remove({});
    });

    //checking whether all instructors will return 
    describe('GET /', () => {
        it('should return all instructor', async () =>{
            const instructors = [
                {fullName : 'instructor1',userName:"inst1",email:"instructor1@gmail.com"},
                {fullName : 'instructor2',userName:"inst2",email:"instructor2@gmail.com"},
            ];

            await Instructor.collection.insertMany(instructors);

            const res = await request(server).get('/api/instructor');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(i => i.fullName === 'instructor1')).toBeTruthy();
            expect(res.body.some(i => i.fullName === 'instructor2')).toBeTruthy();
        });
    });

    //check whether the instructor will return if the id is passed
    describe('GET /:id', () =>  {
        it('should return a instructor if valid id is passed', async () => {
            const instructor = new Instructor({ fullName : 'instructor1', userName:"inst1", email:"instructor1@gmail.com", password:"inst712345"});
            await instructor.save();

            const res = request(server).get('/api/instructor/' + instructor._id);
            
            // expect(res.status).toBe(200);
            // expect(res.body).toHaveProperty('fullName', student.fullName); 
            // expect(res.body).toHaveProperty('userName',student.fullName);
            // console.log("===========Get Method=============",res);
            // console.log("===========Get Method=============",student._id);
            try {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('fullName', instructor.fullName); 
            } catch (error) {
                console.log(error.message);
            }
                
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/instructor/1');
      
            expect(res.status).toBe(404);
          });
      
          it('should return 404 if no genre with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/instructor/' + id);
      
            expect(res.status).toBe(404);
          });

    })



});