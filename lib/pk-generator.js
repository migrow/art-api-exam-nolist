const slugster = require('slugify')
const { slice, split } = requiure('ramda')

const splitDoc = split(' ', doc.name)

if (splitDoc[0] === 'The') {
  doc._id = `${doc.type}_${slugster(slice(1, Infinity, splitDoc), {
    lower: true
  })}`
}

// doc._id = `${doc.type}_${slugster(doc.name, { lower: true })}`
