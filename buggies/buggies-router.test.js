require('dotenv').config();

const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');

describe('buggies', function() {
    //these all get 400's because of no active token.. 
    describe('GET', function() {
        it('from /', function() {
            return request(server).get('/api/buggies')
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.type).toMatch(/json/gi)
            })
        })
    })
    describe('GET', function() {
        it('from /:id', function() {
            return request(server).get('/api/buggies/1')
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.type).toMatch(/json/gi)
            })
        })
    })
    describe('POST', function() {
        it('to /:id/pickedup', function() {
            return request(server).post('/api/buggies/1/pickup')
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.type).toMatch(/json/gi)
            })
        })
    })
    describe('DELETE', function() {
        it('from /:id', function() {
            return request(server).delete('/api/buggies/1')
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.type).toMatch(/json/gi)
            })
        })
    })
    describe('PUT', function() {
        it('to /api/buggies', function() {
            return request(server).put('/api/buggies')
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.type).toMatch(/json/gi)
            })
        })
    })
})