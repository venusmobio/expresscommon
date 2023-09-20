const chai = require('chai');
const chathttp = require('chai-http');
chai.use(chathttp);
const expect = chai.expect;
require('../index');
const { request } = require('./supertest.test');

describe('USERS MODULE====>', () => {
  let fieldId;
  /*
    Test the /POST route
    */
  describe('POST USERS', () => {
    let user = {
      firstName: 'ABC',
      lastName: 'XYZ',
      phoneNumber: 9429090999,
      countryCode: 91,
      email: 'venuschetwani@gmail.com',
      password: 'admin@123',
    };
    it('POST USERS SUCCESS', done => {
      request
        .post('api/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('User Create Success');
          fieldId = res.body.data._id;
          done();
        });
    });
    it('POST USERS FAILED ==> BAD REQUEST', done => {
      delete user.firstName;
      request
        .post('api/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });
  /*
    Test the /GET route
    */
  describe('GET ALL USER', () => {
    it('GET ALL USERS SUCCESS', done => {
      request.get('api/users').end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User List Success');
        done();
      });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe('GET USER ', () => {
    it('GET USER FAILED ==> ID INVAILD', done => {
      request.get('api/users/k').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('User Detail Failed');
        done();
      });
    });
    it('GET USER FAILED ==> ', done => {
      request.get(`api/users/${fieldId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User Detail Success');
        done();
      });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe('USER UPDATE ', () => {
    const updatedUser = {
      firstName: 'vaidik',
      lastName: 'shah',
    };
    it('USER UPDATE FAILED ==>INVAILD ID', done => {
      request
        .put('api/users/k')
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message').equal('User Update Failed');
          done();
        });
    });
    it('USER UPDATE SUCCESS', done => {
      request
        .put(`api/users/${fieldId}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('User Update Success');
          done();
        });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe('USER DELETE ', () => {
    it('USER DELETE FAILED ==> INVAILD ID', done => {
      request.delete('api/users/k').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('User Delete Failed');
        done();
      });
    });
    it('USER DELETE SUCCESS', done => {
      request.delete(`api/users/${fieldId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User Delete Success');
        done();
      });
    });
  });
});
