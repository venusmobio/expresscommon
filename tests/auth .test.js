const chai = require('chai');
const chathttp = require('chai-http');
chai.use(chathttp);
const expect = chai.expect;
require('../index');
const { request } = require('./supertest.test');

let Token, fieldId;

describe('AUTH Controller====>', () => {
  describe('SIGNUP API', () => {
    let user = {
      firstName: 'Jhanvi',
      lastName: 'varlani',
      phoneNumber: 9429090999,
      countryCode: 91,
      email: 'venusc.mobio@gmail.com',
      password: 'admin@123',
    };
    /*
    Test the /POST route
    */
    it('SIGNUP SUCCESS', done => {
      request
        .post('api/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Auth Signup Success');
          fieldId = res.body.data._id;
          done();
        });
    });
    it('SIGNUP FAILED ==> USER ALREADY EXIST', done => {
      request
        .post('api/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('User Already Exist');
          done();
        });
    });
    it('SIGNUP FAILED ==> BAD REQUEST ', done => {
      delete user.firstName;
      request
        .post('api/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it('SIGNUP FAILED ==> BAD REQUEST ', done => {
      let Invaliduser = {
        firstName: 'venus',
        lastName: 'chetwani',
        phoneNumber: 'shgdhgsdh',
        countryCode: 91,
        email: 'venuschetwani@gmail.com',
        password: 'admin@123',
      };
      request
        .post('api/auth/signup')
        .send(Invaliduser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message').equal('Auth Signup Failed');
          done();
        });
    });
  });
  describe('LOGIN API', () => {
    /*
    Test the /POST route
    */
    it('LOGIN FAILED ==> USER NOT FOUND', done => {
      const user = {
        email: 'venusc1.mobio@gmail.com',
        password: 'admin@123',
        deviceInfo: 'linux',
      };
      request
        .post('api/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('User Not Found');
          done();
        });
    });
    it('LOGIN FAILED ==> USER UNAUTHORIZED', done => {
      const user = {
        email: 'venusc.mobio@gmail.com',
        password: 'admin@12',
        deviceInfo: 'linux',
      };
      request
        .post('api/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Auth Password Failed');
          done();
        });
    });
    it('LOGIN SUCCESS', done => {
      const Authuser = {
        email: 'venusc.mobio@gmail.com',
        password: 'admin@123',
        deviceInfo: 'linux',
      };
      request
        .post('api/auth/login')
        .send(Authuser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Auth Login Success');
          Token = res.body.data.token;
          done();
        });
    });
  });
  describe('PROFILE API', () => {
    /*
    Test the /GET route
    */
    it('PROFILE FAILED  ==> BAD REQUEST', done => {
      request.get('api/auth/profile').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Please send authentication token');
        done();
      });
    });
    it('PROFILE FAILED  ==> UNAUTHORIZED', done => {
      request
        .get('api/auth/profile')
        .set('Authorization', 'Bearer e')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Unauthenticated!');
          done();
        });
    });
    it('PROFILE SUCCESS', done => {
      request
        .get('api/auth/profile')
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Auth profile Success');
          done();
        });
    });
  });
  describe('PROFILE UPDATE API', () => {
    const updatedUser = {
      firstName: 'vaidik',
      lastName: 'shah',
    };
    /*
     * Test the PUT route
     */
    it('PROFILE UPDATE FAILED ==> BAD REQUEST', done => {
      const User = {
        lastName: 'shah',
      };
      request
        .post('api/auth/update-profile')
        .set('Authorization', `Bearer ${Token}`)
        .send(User)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it('PROFILE UPDATE FAILED  ==> UNAUTHORIZED', done => {
      request
        .post('api/auth/update-profile')
        .set('Authorization', 'Bearer e')
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Unauthenticated!');
          done();
        });
    });
    it('PROFILE UPDATE FAILED  ==> TOKEN NOT GIVEN', done => {
      request
        .post('api/auth/update-profile')
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('Please send authentication token');
          done();
        });
    });
    it('PROFILE UPDATE SUCCESS', done => {
      request
        .post('api/auth/update-profile')
        .set('Authorization', `Bearer ${Token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Auth update profile Success');
          done();
        });
    });
  });
  describe('LOGOUT API', () => {
    /*
     * Test the POST route
     */
    it('LOGOUT FAILED ==> BAD REQUEST', done => {
      request.post('api/auth/logout').end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('Please send authentication token');
        done();
      });
    });
    it('LOGOUT FAILED ==> UNAUTHORIZED', done => {
      request
        .post('api/auth/logout')
        .set('Authorization', 'Bearer e')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Unauthenticated!');
          done();
        });
    });
    it('LOGOUT SUCCESS', done => {
      request
        .post('api/auth/logout')
        .set('Authorization', `Bearer ${Token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('User Logout Success');
          done();
        });
    });
  });
  describe('forgot-password API', () => {
    /*
     * Test the POST route
     */
    it('forgot-password FAILED ==> BAD REQUEST', done => {
      const user = {
        email: 'venusc.mobio@gmail.com',
      };
      request
        .post('api/auth/forgot-password')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it('forgot-password FAILED ==> EMAIL NOT FOUND', done => {
      const user = {
        email: 'venusc.mobio@gmail.co',
        resetLink: 'https://localhost:3000/reset-password',
      };
      request
        .post('api/auth/forgot-password')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('Email Not Found');
          done();
        });
    });
    it('forgot-password SUCCESS', done => {
      const user = {
        email: 'venusc.mobio@gmail.com',
        resetLink: 'https://localhost:3000/reset-password',
      };
      request
        .post('api/auth/forgot-password')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Auth forgotPassword Success');
          done();
        });
    });
  });
  describe('reset-password API', () => {
    /*
     * Test the POST route
     */
    it('reset-password FAILED ==> BAD REQUEST', done => {
      const user = {
        newPassword: 'Admin@1234',
      };
      request
        .post('api/auth/reset-password')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it('reset-password FAILED ==> INVAILD OR EXPIRED TOKEN', done => {
      const user = {
        token: '.',
        newPassword: 'Admin@1234',
      };
      request
        .post('api/auth/reset-password')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('Invalid or expired token');
          done();
        });
    });
    it('reset-password SUCCESS', done => {
      request.get(`api/users/${fieldId}`).end((err, res) => {
        const user = {
          token: res.body.data.resetToken,
          newPassword: 'Admin@1234',
        };
        request
          .post('api/auth/reset-password')
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Auth resetPassword Success');
            done();
          });
      });
    });
    it('LOGIN WITH NEW PASSWORD', done => {
      const Authuser = {
        email: 'venusc.mobio@gmail.com',
        password: 'Admin@1234',
        deviceInfo: 'linux',
      };
      request
        .post('api/auth/login')
        .send(Authuser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Auth Login Success');
          Token = res.body.data.token;
          done();
        });
    });
  });
});
