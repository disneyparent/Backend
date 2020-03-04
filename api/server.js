const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../auth/auth-router.js')
const bugsRouter = require('../buggies/buggies-router.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/buggies', authenticate, bugsRouter);


server.get('/', (req, res) => {
    const newThing = ({ thing: 'Cool', yep: 'yes'})
    res.status(200).json(newThing)
})

module.exports = server;