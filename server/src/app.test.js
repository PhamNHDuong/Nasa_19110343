const app = require('./app');
const request = require('supertest');
const http = require('http');
const { config } = require('process');

const server = http.createServer(app);

describe('Endpoint : /planets', function() {
    it('Get All Planets Success', function(done){
        request(server)
            .get('/planets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


describe('Endpoint : /launches', function() {
    it('Get All Launches Success', function(done){
        request(server)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Add New Launches Success', function(done){
        request(server)
            .post('/launches')
            .send({
                mission: 'Section 2',
                rocket: 'Kepler 2.1',
                target: 'Fly Test',
                launchDate: 'November 22, 2030'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Delete A Launch By Id Success', function(done){
        const id = 100;
        request(server)
            .delete(`/launches/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});