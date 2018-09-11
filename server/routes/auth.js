import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const secret = 'miclavesecreta'

const users = [
  {
    firstName: 'Sergio',
    lastName: 'Minei',
    email: 'hola@sergio.com',
    password: '123456',
    _id: 123
  }
]

const findUserByEmail = e => users.find(({ email }) => email === e)

const comparePasswords = (providedPassword, userPassword) => providedPassword === userPassword

app.post('/signin', (req, res, next) => {
  const { email, password } = req.body
  const user = findUserByEmail(email)

  if(!user) {
    return handleLoginFailes(res)
  }

  if(!comparePasswords(password, user.password)) {
    debug(`Passwords do not match: ${password} !== ${user.password}`)
    return handleLoginFailes(res, 'El correo y la contraseña no coinciden')
  }

  const token = createToken(user)
  res.status(200).json({
    message: 'Login succeded',
    token,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })
})

// /api/auth/signup
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const user = {
    _id: +new Date(),
    firstName,
    lastName,
    email,
    password
  }
  debug(`Creating new user: ${user}`)
  users.push(user)
  const token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    firstName,
    lastName,
    email
  })
})

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 })

const handleLoginFailes = (res, message) => {
  res.status(401).json({
    message: 'Login failes',
    error: message || 'Email and password don\'t match'
  })
}

export default app
