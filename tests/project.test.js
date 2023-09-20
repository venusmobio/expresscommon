const chai = require('chai');
const chathttp = require('chai-http');
chai.use(chathttp);
const expect = chai.expect;
require('../index');
const { request } = require('./supertest.test');

describe('PROJECTS MODULE====>', () => {
  let fieldId;
  /*
    Test the /POST route
    */
  describe('CREATE PROJECT', () => {
    let record = {
      projectName: 'common module',
    };
    it('CREATE PROJECT FAILED ==> BAD REQUEST ', done => {
      request.post('api/projects').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('errors');
        done();
      });
    });
    it('CREATE PROJECT SUCCESS ', done => {
      request
        .post('api/projects')
        .send(record)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Project Create Success');
          fieldId = res.body.data._id;
          done();
        });
    });
  });
  /*
    Test the /GET route
    */
  describe('GET PROJECTS', () => {
    it('GET ALL PROJECTS SUCCESS', done => {
      request.get('api/projects').end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Project List Success');
        done();
      });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe('GET PROJECT', () => {
    it('GET PROJECT FAILED ==> INVAILD ID', done => {
      request.get('api/projects/l').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Project Detail Failed');
        done();
      });
    });
    it('GET PROJECT FAILED ==> NOT FOUND', done => {
      request.get('api/projects/56cb91bdc3464f14678934ca').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Project Not Found');
        done();
      });
    });
    it('GET PROJECT SUCCESS', done => {
      request.get(`api/projects/${fieldId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Project Detail Success');
        done();
      });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe('UPDATE PROJECT', () => {
    const updatedRecord = {
      projectName: 'Common Module',
    };
    it('UPDATE PROJECT FAILED ==> INVAILD ID ', done => {
      request
        .put('api/projects/K')
        .send(updatedRecord)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message').equal('Project Update Failed');
          done();
        });
    });
    it('UPDATE PROJECT FAILED ==> NOT FOUND', done => {
      request
        .put('api/projects/56cb91bdc3464f14678934ca')
        .send(updatedRecord)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('Project Not Found');
          done();
        });
    });
    it('UPDATE PROJECT SUCCESS', done => {
      request
        .put(`api/projects/${fieldId}`)
        .send(updatedRecord)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Project Update Success');
          done();
        });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe('DELETE PROJECT', () => {
    it('DELETE PROJECT FAILED ==> INVAILD ID ', done => {
      request.delete('api/projects/K').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Project Delete Failed');
        done();
      });
    });
    it('UPDATE PROJECT FAILED ==> NOT FOUND', done => {
      request.delete('api/projects/56cb91bdc3464f14678934ca').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Project Not Found');
        done();
      });
    });
    it('DELETE PROJECT SUCCESS', done => {
      request.delete(`api/projects/${fieldId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Project Delete Success');
        done();
      });
    });
  });
});
