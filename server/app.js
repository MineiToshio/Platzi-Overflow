import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { question, auth } from './routes'

const app = express() //express devuelve en una variable el servidor

app.use(bodyParser.json()) //poder leer todo lo que viene en formato json del cliente
app.use(bodyParser.urlencoded({ extended: true })) //poder leer todo lo que viene en formato utf-8

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'dist')))
}

app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app
