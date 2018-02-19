require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL)

const paintings = db
  .bulkDocs([
    {
      _id: 'painting_starry-night',
      name: 'The Starry Night',
      type: 'painting',
      movement: 'post-impressionism',
      artist: 'Vincent van Gogh',
      yearCreated: 1889,
      museum: { name: 'Museum of Modern Art', location: 'New York' }
    },
    {
      _id: 'painting_water-lilies-nympheas',
      name: 'Water Lilies Nympheas',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Claude Monet',
      yearCreated: 1907,
      museum: { name: 'Art Gallery of Ontario', location: 'Toronto' }
    },
    {
      _id: 'painting_last-supper',
      name: 'The Last Supper',
      type: 'painting',
      movement: 'Renaissance',
      artist: 'Leonardo da Vinci',
      yearCreated: 1495,
      museum: { name: 'Santa Maria delle Grazie', location: 'Milan' }
    },
    {
      _id: 'painting_sunday-afternoon-on-the_island-of-la-grande-jatte',
      name: 'A Sunday Afternoon on the Island of La Grande Jatte',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Georges Seurat',
      yearCreated: 1884,
      museum: { name: 'Art Institute of Chicago', location: 'Chicago' }
    },
    {
      _id: 'painting_guernica',
      name: 'Guernica',
      type: 'painting',
      movement: 'surrealism',
      artist: 'Pablo Picasso',
      yearCreated: 1937,
      museum: {
        name: 'Museo Nacional Centro de Arte Reina Sofía',
        location: 'Madrid'
      }
    },
    {
      _id: 'painting_bal-du-moulin-de-la-galette',
      name: 'Bal du moulin de la Galette',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Pierre-Auguste Renoires',
      yearCreated: 1876,
      museum: { name: 'Musée d’Orsay', location: 'Paris' }
    },
    {
      _id: 'artist_vincent-van-gogh',
      type: 'artist',
      name: 'Vincent van Gogh',
      country: 'Amsterdam',
      birthYear: 1853,
      deathYear: 1890
    },
    {
      _id: 'artist_claude-monet',
      type: 'artist',
      name: 'Claude Monet',
      country: 'France',
      birthYear: 1840,
      deathYear: 1926
    },
    {
      _id: 'artist_leonardo-da-vinci',
      type: 'artist',
      name: 'Leonardo da Vinci',
      country: 'Italy',
      birthYear: 1452,
      deathYear: 1519
    },
    {
      _id: 'artist_georges-seurat',
      type: 'artist',
      name: 'Georges Seurat',
      country: 'France',
      birthYear: 1859,
      deathYear: 1891
    },
    {
      _id: 'artist_pablo-picasso',
      type: 'artist',
      name: 'Pablo Picasso',
      country: 'Spain',
      birthYear: 1881,
      deathYear: 1973
    },
    {
      _id: 'artist_pierre-auguste-renoires',
      type: 'artist',
      name: 'Pierre-Auguste Renoires',
      country: 'France',
      birthYear: 1841,
      deathYear: 1919
    }
  ])
  .then(res => console.log(res))
  .catch(err => console.log(err))
