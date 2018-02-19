require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  createPainting,
  createArtist,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc
} = require('./dal')
const docFilter = require('./lib/doc-filter')
const reqFieldChecker = require('./lib/check-req-fields')
const objCleaner = require('./lib/clean-body')

const { propOr, join, not, isEmpty } = require('ramda')

const port = propOr(4000, 'PORT', process.env.PORT)

const paintingReqFieldChkr = reqFieldChecker([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const artistReqFieldChkr = reqFieldChecker([
  'name',
  'country',
  'birthYear',
  'deathYear'
])

const putPaintingReqFields = reqFieldChecker([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])

const putArtistReqFields = reqFieldChecker([
  '_id',
  '_rev',
  'name',
  'country',
  'birthYear',
  'deathYear'
])

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send(`<h1> Welcome to the Art API.</h1>`)
})

app.get('/paintings', function(req, res, next) {
  const options = {
    include_docs: true,
    startkey: 'painting_',
    endkey: 'painting_\ufff0',
    limit: 5
  }
  getDocs(options)
    .then(docFilter(req, res))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.get('/artists', function(req, res, next) {
  const options = {
    include_docs: true,
    startkey: 'artist_',
    endkey: 'artist_\ufff0',
    limit: 5
  }
  getDocs(options)
    .then(docFilter(req, res))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.post('/paintings', function(req, res, next) {
  const missingFields = paintingReqFieldChkr(req.body)

  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Missing Fields: ${join(' ', paintingReqFieldChkr(req.body))}`
      )
    )
  }
  createPainting(req.body)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.post('/artists', function(req, res, next) {
  const missingFields = artistReqFieldChkr(req.body)

  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Missing Fields: ${join(' ', artistReqFieldChkr(req.body))}`
      )
    )
  }
  createArtist(req.body)
    .then(artist => res.send(artist))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.get('/paintings/:id', function(req, res, next) {
  getDoc(req.params.id)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.get('/artists/:id', function(req, res, next) {
  getDoc(req.params.id)
    .then(artist => res.send(artist))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.delete('/paintings/:id', function(req, res, next) {
  deleteDoc(req.params.id)
    .then(deletedResult => res.send(deletedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.delete('/artists/:id', function(req, res, next) {
  deleteDoc(req.params.id)
    .then(deletedResult => res.send(deletedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.put('/paintings/:id', function(req, res, next) {
  if (isEmpty(req.body)) {
    next(new HTTPError(400, 'Missing Request Body'))
    return
  }
  const bodyCleaner = objCleaner([
    '_id',
    '_rev',
    'name',
    'movement',
    'artist',
    'yearCreated',
    'museum'
  ])
  const cleanedBody = bodyCleaner(req.body)
  const missingFields = putPaintingReqFields(cleanedBody)
  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Request body missing these fields: ${join(', ', missingFields)}`
      )
    )
    return
  }
  updateDoc(cleanedBody)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.put('/artists/:id', function(req, res, next) {
  if (isEmpty(req.body)) {
    next(new HTTPError(400, 'Missing Request Body'))
    return
  }
  const bodyCleaner = objCleaner([
    '_id',
    '_rev',
    'name',
    'style',
    'country',
    'birthYear',
    'deathYear'
  ])
  const cleanedBody = bodyCleaner(req.body)
  const missingFields = putArtistReqFields(cleanedBody)
  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Request body missing these fields: ${join(', ', missingFields)}`
      )
    )
    return
  }
  updateDoc(req.body)
    .then(artist => res.send(artist))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.use(function(err, req, res, next) {
  res.status(err.statusCode || 500) // or use err.statusCode instead
  res.send(err.message)
})

app.listen(port, () => console.log('ART API IS UP on port', port))
