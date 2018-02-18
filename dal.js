require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL)
const slugster = require('slugify')

const createPainting = doc => {
  doc._id = `painting_${slugster(doc.name, { lower: true })}`
  return db.put(doc)
}

module.exports = { createPainting }
