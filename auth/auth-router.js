const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')

const Users = require('../users/users-model.js')

router.post('/register', validateCred, (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/login', validateCred, (req, res) => {
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({ user, token })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'uh oh' })
    })
})

function validateCred(req, res, next) {
  if(req.body.password && req.body.username){
    next()
  }else{
    res.status(500).json({message: "enter a username and password"})
  }
}

function generateToken (user) {
  const payload = {
    id: user.id,
    username: user.username,
    user_type: user.user_type
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router