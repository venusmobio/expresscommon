const chai = require('chai');
const chathttp = require('chai-http');
chai.use(chathttp);
const expect = chai.expect;
require('../index');
const { request } = require('./supertest.test');

describe('TASKS MODULE====>', () => {
  let fieldId;
  /*
    Test the /POST route
    */
  describe('CREATE TASK', () => {
    let record = {
      taskName: 'auth module',
    };
    it('CREATE TASK FAILED ==> BAD REQUEST', done => {
      request.post('api/tasks').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('errors');
        done();
      });
    });
    it('CREATE TASK SUCCESS', done => {
      request
        .post('api/tasks')
        .send(record)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Task Create Success');
          fieldId = res.body.data._id;
          done();
        });
    });
  });
  /*
    Test the /GET route
    */
  describe('GET ALL TASKS', () => {
    it('GET ALL TASKS SUCCESS', done => {
      request.get('api/tasks').end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Task List Success');
        done();
      });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe('GET TASK', () => {
    it('GET TASK FAILED ==>INVAILD ID', done => {
      request.get('api/tasks/K').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Task Detail Failed');
        done();
      });
    });
    it('GET TASK FAILED ==> NOT FOUND', done => {
      request.get('api/tasks/56cb91bdc3464f14678934ca').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Task Not Found');
        done();
      });
    });
    it('GET TASK SUCCESS', done => {
      request.get(`api/tasks/${fieldId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Task Detail Success');
        done();
      });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe('UPDATE TASK', () => {
    const updatedRecord = {
      taskName: 'Auth Module',
    };
    it('UPDATE TASK FAILED ==>INVAILD ID', done => {
      request.put('api/tasks/K').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Task Update Failed');
        done();
      });
    });
    it('UPDATE TASK FAILED ==> NOT FOUND', done => {
      request.put('api/tasks/56cb91bdc3464f14678934ca').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Task Not Found');
        done();
      });
    });
    it('UPDATE TASK SUCCESS', done => {
      request
        .put(`api/tasks/${fieldId}`)
        .send(updatedRecord)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Task Update Success');
          done();
        });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe('DELETE TASK', () => {
    it('DELETE TASK FAILED ==>INVAILD ID', done => {
      request.delete('api/tasks/K').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Task Delete Failed');
        done();
      });
    });
    it('DELETE TASK FAILED ==> NOT FOUND', done => {
      request.delete('api/tasks/56cb91bdc3464f14678934ca').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Task Not Found');
        done();
      });
    });
    it('DELETE TASK SUCCESS', done => {
      request.delete(`api/tasks/${fieldId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Task Delete Success');
        done();
      });
    });
  });
});
