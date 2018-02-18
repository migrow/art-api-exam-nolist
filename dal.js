require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL)
const slugster = require('slugify')

const createPainting = doc => {
  doc._id = `painting_${slugster(doc.name, { lower: true })}`
  doc.type = 'painting'
  return db.put(doc)
}

const getPainting = id => db.get(id)

const deletePainting = function(id, cb) {
  db.get(id, function(err, doc) {
    if (err) {
      cb(err)
      return
    }
    db.remove(doc, function(err, deletedResult) {
      if (err) {
        cb(err)
        return
      }
      cb(null, deletedResult)
    })
  })
}

const updatePainting = doc => db.put(doc)

module.exports = { createPainting, getPainting, deletePainting, updatePainting }
