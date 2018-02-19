const slugster = require('slugify')
const { slice, split, join } = require('ramda')

const pkGenerator = doc => {
  const splitDoc = split(' ', doc.name)
  if (splitDoc[0] === 'The' || splitDoc[0] === 'A') {
    doc._id = `${doc.type}_${slugster(join(' ', slice(1, Infinity, splitDoc)), {
      lower: true
    })}`
  } else {
    doc._id = `${doc.type}_${slugster(doc.name, { lower: true })}`
  }
}
module.exports = pkGenerator
// doc._id = `${doc.type}_${slugster(doc.name, { lower: true })}`
// in case of emergency, this works in the dal to generate primary key without using pkGenerator()
// const splitDoc = split(' ', doc.name)
// if (splitDoc[0] === 'The' || splitDoc[0] === 'A') {
//   doc._id = `${doc.type}_${slugster(join(' ', slice(1, Infinity, splitDoc)), {
//     lower: true
//   })}`
// } else {
//   doc._id = `${doc.type}_${slugster(doc.name, { lower: true })}`
// }
// For artists, where 'A' and 'The' aren't concerns
// doc._id = `${doc.tyoe}_${slugster(doc.name, { lower: true })}`
