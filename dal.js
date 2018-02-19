require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL)
const slugster = require('slugify')
const { reject, split, slice, join, pluck } = require('ramda')
const pkGenerator = require('./lib/pk-generator')

const createPainting = doc => {
  doc.type = 'painting'
  pkGenerator(doc)
  return db.put(doc)
}

const createArtist = doc => {
  doc.type = 'artist'
  pkGenerator(doc)
  return db.put(doc)
}

const getDoc = id => db.get(id)

const deleteDoc = id =>
  db
    .get(id)
    .then(id => db.remove(id))
    .catch(err => console.log(err))

const updateDoc = doc => db.put(doc)

const getDocs = options =>
  db.allDocs(options).then(result => pluck('doc', result.rows))

module.exports = {
  createPainting,
  createArtist,
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc
}
