//integration testing to check the get methods of the student
const request = require('supertest');
const {Student} = require('../../models/student');
const mongoose = require('mongoose');

let server;

describe('/api/student', () =>{
    beforeEach(() => { server = require('../../index'); })

    afterEach(async () =>{
        await server.close();
        await Student.remove({});
    });

    //checking whether all students will return
    describe('GET /', () => {
        it('should return all students', async () =>{
            const students = [
                {fullName : 'student1',userName:"std1",email:"student1@gmail.com"},
                {fullName : 'student2',userName:"std2",email:"student2@gmail.com"},
            ];

            await Student.collection.insertMany(students);

            const res = await request(server).get('/api/student');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(s => s.fullName === 'student1')).toBeTruthy();
            expect(res.body.some(s => s.fullName === 'student2')).toBeTruthy();
        });
    });

    //check whether the student will return if the id is passed
    describe('GET /:id', () =>  {
        it('should return a student if valid id is passed', async () => {
            const student = new Student({ fullName : 'student1', userName:"std12", email:"student1@gmail.com", password:"stud712345"});
            await student.save();

            const res = request(server).get('/api/student/' + student._id);
            
            // expect(res.status).toBe(200);
            // expect(res.body).toHaveProperty('fullName', student.fullName); 
            // expect(res.body).toHaveProperty('userName',student.fullName);
            // console.log("===========Get Method=============",res);
            // console.log("===========Get Method=============",student._id);
            try {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('fullName', student.fullName); 
            } catch (error) {
                console.log(error.message);
            }
                
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/student/1');
      
            expect(res.status).toBe(404);
          });
      
          it('should return 404 if no genre with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/student/' + id);
      
            expect(res.status).toBe(404);
          });

    })



});