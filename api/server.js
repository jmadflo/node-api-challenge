const express = require('express')
const projectRouter = require('../projects/projectRouter')
const actionRouter = require('../actions/actionRouter')
const cors = require('cors')


const server = express()

server.use(logger)
server.use(express.json())
server.use(cors()) // for access from React app
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my API!</h2>`)
})

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request was sent to ${req.url} at ${new Date().toISOString()}`)
  next()
}

module.exports = server