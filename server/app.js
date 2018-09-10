import express from 'express'
import { question } from './routes'

const app = express() //express devuelve en una variable el servidor

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

app.use('/api/questions', question)

export default app
