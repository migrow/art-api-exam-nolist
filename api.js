require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const reqFieldChecker = require('./lib/check-req-fields')
const postCleaner = require('./lib/clean-post-body')
const { createPainting } = require('./dal.js')
const { propOr, join, not, isEmpty } = require('ramda')
app.use(bodyParser.json())
const port = propOr(4000, 'PORT', process.env.PORT)

app.get('/', function(req, res, next) {
  res.send(
    `<h1> Welcome to the Art API. Manage all the paintings for much win.</h1>`
  )
})

app.post('/paintings', (req, res, next) => {
  createPainting(req.body)
    .then(createdPainting => res.status(201).send(createdPainting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.use(function(err, req, res, next) {
  res.status(err.statusCode || 500) // or use err.statusCode instead
  res.send(err.message)
})

app.listen(port, () => console.log('PAINTINGS API IS UP on port', port))
