require('dotenv').config();

const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');

describe('Authentication', function() {

    describe('API is up and running', function() {
        it('should return 200 OK', function() {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toMatch(/json/gi)
                    expect(res.body.thing).toBe("Cool")
                    expect(res.body.yep).toBe("yes")
                })
        })
    })

    describe('Creating new user', function() {
        const newUser = {
            username: 'thetestinguser',
            password: 'testing123'
        }
        
        it.skip('register new user', function() {
            return request(server).post('/api/auth/register')
                .send(newUser)
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.type).toMatch(/json/gi)
                })
        })
    })
    //this one is weird, only works when tyler is in database i think?
    //cannot login with user above
    describe('Login', function () {
        it('login new user', function() {
            return request(server)
                .post('/api/auth/login')
                .send({username: 'tyler', password: 'tyler'})
                .then(res => {
                    expect(res.type).toMatch("application/json")
                })
        })
    })
})