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

export const questions = new Array(10).fill(question)

export const questionsMiddleware = (req, res, next) => {
  req.questions = questions
  next()
}

export const questionMiddleware = (req, res, next) => {
  const { id } = req.params
  req.question = questions.find(({ _id }) => _id === +id)
  next()
}
