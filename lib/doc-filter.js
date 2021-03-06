const { filter, head, last, pathOr, split, toLower } = require('ramda')

function docFilter(req, res) {
  var filterFxn = null
  if (pathOr(null, ['query', 'filter'], req)) {
    const filterProp = head(split(':', req.query.filter))
    const filterValue = last(split(':', req.query.filter))
    filterFxn = docs =>
      res
        .status(200)
        .send(
          filter(doc => toLower(doc[filterProp]) == toLower(filterValue), docs)
        )
  } else {
    filterFxn = docs => res.status(200).send(docs)
  }
  return filterFxn
}

module.exports = docFilter
