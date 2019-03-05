const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const config = require('./test.config');
const request = require('supertest');

describe('Streams test', () =>{

    it('Read notes as stream', (done)=> {
        request(app)
        .get(`/api/v1/notes`)
        .send(config.USER_ID)
        .expect(200)
        .then((response)=>{
        expect(response.body).to.have.property('notes');
        done();
        });
    });

    it('upload notes as stream to db', (done)=> {
        done();
    });
})