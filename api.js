require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  createPainting,
  getPainting,
  deletePainting,
  updatePainting
} = require('./dal')

const { propOr, join, not, isEmpty } = require('ramda')

const port = propOr(4000, 'PORT', process.env.PORT)

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send(
    `<h1> Welcome to the Art API. Manage all the paintings for much win.</h1>`
  )
})

app.post('/paintings', function(req, res, next) {
  createPainting(req.body)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.get('/paintings/:id', function(req, res, next) {
  getPainting(req.params.id)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.delete('/paintings/:id', function(req, res, next) {
  deletePainting(req.params.id, function(err, deletedResult) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.send(deletedResult)
  })
})

app.put('/paintings/:id', function(req, res, next) {
  updatePainting(req.body)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.use(function(err, req, res, next) {
  res.status(err.statusCode || 500) // or use err.statusCode instead
  res.send(err.message)
})

app.listen(port, () => console.log('PAINTINGS API IS UP on port', port))
