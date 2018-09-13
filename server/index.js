import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl, port } from './config'

const debug = new Debug('platzi-overflow:root')

async function start () {
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(mongoUrl, { useNewUrlParser: true })

  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })
}

start()
