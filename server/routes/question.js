import express from 'express'

const app = express.Router()

const currenUser = {
  firstName: 'Sergio',
  lastName: 'Minei',
  email: 'hola@sergio.com',
  password: '123456'
}

function questionMiddleware(req, res, next) {
  const { id } = req.params
  req.question = questions.find(({ _id }) => _id === +id)
  next()
}

function userMiddleware(req, res, next) {
  req.user = currenUser
  next()
}

const question = {
  _id: 1,
  title: '¿Cómo utilizo un componente en Android?',
  description: 'Miren esta es mi pregunta...',
  createsAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: {
    firstName: 'Sergio',
    lastName: 'Minei',
    email: 'hola@sergio.com',
    password: '123456'
  }
}

const questions = new Array(10).fill(question)

// GET /api/questions
app.get('/', (req, res) => res.status(200).json(questions))

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question)
})

// POST /api/question
app.post('/', userMiddleware, (req, res) => {
  const question = req.body
  question._id = +new Date()
  question.user = req.user
  question.createsAt = new Date()
  question.answers = []
  questions.push(question)
  res.status(201).json(question)
})

app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
  const answer = req.body
  const q = req.question
  answer.createsAt = new Date()
  answer.user = req.user
  q.answers.push(answer)
  res.status(201).json(answer)
})

export default app
