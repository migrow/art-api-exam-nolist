require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL)
const slugster = require('slugify')
const { reject, split, slice, join, pluck } = require('ramda')

const createPainting = doc => {
  doc.type = 'painting'
  const splitDoc = split(' ', doc.name)
  if (splitDoc[0] === 'The') {
    doc._id = `${doc.type}_${slugster(join(' ', slice(1, Infinity, splitDoc)), {
      lower: true
    })}`
  } else if (splitDoc[0] === 'A') {
    doc._id = `${doc.type}_${slugster(join(' ', slice(1, Infinity, splitDoc)), {
      lower: true
    })}`
  } else {
    doc._id = `${doc.type}_${slugster(doc.name, { lower: true })}`
  }
  return db.put(doc)
}

const createArtist = doc => {
  doc.type = 'artist'
  doc._id = `${doc.tyoe}_${slugster(doc.name, { lower: true })}`

  return db.put(doc)
}

const getPainting = id => db.get(id)

const getArtist = id => db.get(id)

const deleteArtist = id =>
  db
    .get(id)
    .then(id => db.remove(id))
    .catch(err => console.log(err))

const deletePainting = id =>
  db
    .get(id)
    .then(id => db.remove(id))
    .catch(err => console.log(err))

const updatePainting = doc => db.put(doc)
const updateArtist = doc => db.put(doc)

const getPaintings = options =>
  db.allDocs(options).then(result => pluck('doc', result.rows))

const getArtists = options =>
  db.allDocs(options).then(result => pluck('doc', result.rows))

module.exports = {
  createPainting,
  getPainting,
  deletePainting,
  updatePainting,
  createArtist,
  getArtist,
  deleteArtist,
  updateArtist,
  getPaintings,
  getArtists
}
