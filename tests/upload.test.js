const chai = require('chai');
const chathttp = require('chai-http');
chai.use(chathttp);
const expect = chai.expect;
require('../index');
const { request } = require('./supertest.test');
const fs = require('fs');

describe('UPLOADS MODULE ====>', () => {
  let fileId;
  /*
    Test the /POST route
    */
  describe('POST FILE', () => {
    it('POST FILE FAILED ==> BAD REQUEST', done => {
      request.post('api/uploads').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('file can not be empty');
        done();
      });
    });
    it('POST FILE FAILED ==> MULTER ERROR', done => {
      request
        .post('api/uploads')
        .attach(
          'file',
          fs.readFileSync('/home/venus/Downloads/xampp-linux-x64-8.0.28-0-installer.run'),
          'xampp-linux-x64-8.0.28-0-installer.run'
        )
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
    it('POST FILE SUCCESS', done => {
      request
        .post('api/uploads')
        .attach(
          'file',
          fs.readFileSync('/home/venus/Pictures/Screenshot from 2023-08-22 15-41-27.png'),
          'Screenshot from 2023-08-22 15-41-27'
        )
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Upload Create Success');
          fileId = res.body.data._id;
          done();
        });
    });
    it('POST FILE FAILED ==> FILE ALREADY EXIST', done => {
      request
        .post('api/uploads')
        .attach(
          'file',
          fs.readFileSync('/home/venus/Pictures/Screenshot from 2023-08-22 15-41-27.png'),
          'Screenshot from 2023-08-22 15-41-27'
        )
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('Upload Already Exist');
          done();
        });
    });
  });
  /*
    Test the /GET route
    */
  describe('GET ALL FILES', () => {
    it('GET ALL FILES SUCCESS', done => {
      request.get('api/uploads').end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Upload List Success');
        done();
      });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe('GET FILE', () => {
    it('GET FILE FAILED ==> INVALID ID', done => {
      request.get('api/uploads/k').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Upload Detail Failed');
        done();
      });
    });
    it('GET FILE SUCCESS', done => {
      request.get(`api/uploads/${fileId}`).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Upload Detail Success');
        done();
      });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe('UPDATE FILE', () => {
    it('UPDATE FILE FAILED ==> INVALID ID', done => {
      request
        .put('api/uploads/K')
        .attach('file', fs.readFileSync('/home/venus/Pictures/updated.png'), 'updated.png')
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message').equal('Upload Update Failed');
          done();
        });
    });
    it('UPDATE FILE FAILED ==> BAD REQUEST', done => {
      request.put(`api/uploads/${fileId}`).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('file can not be empty');
        done();
      });
    });
    it('UPDATE FILE FAILED ==> FILE ALREADY EXIST', done => {
      request
        .put(`api/uploads/${fileId}`)
        .attach(
          'file',
          fs.readFileSync('/home/venus/Pictures/Screenshot from 2023-08-22 15-41-27.png'),
          'Screenshot from 2023-08-22 15-41-27'
        )
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('Upload Already Exist');
          done();
        });
    });
    it('UPDATE FILE SUCCESS', done => {
      request
        .put(`api/uploads/${fileId}`)
        .attach('file', fs.readFileSync('/home/venus/Pictures/updated.png'), 'updated.png')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Upload Update Success');
          done();
        });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe('DELETE FILE', () => {
    it('DELETE FILE FAILED ==> INVALID ID', done => {
      request.delete('api/uploads/K').end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Upload Delete Failed');
        done();
      });
    });
    it('DELETE FILE SUCCESS', done => {
      request
        .delete(`api/uploads/${fileId}`) // Use the ID obtained from the upload
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Upload Delete Success');
          done();
        });
    });
  });
});
