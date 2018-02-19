# Art API

## Getting Started

## Creating a Database
To create a database from your terminal, if you have Roo installed, type the command `roo db add <database name>`. This will create a roo database with the name you assigned it. An example of this would be as follows.

`roo db add art-api`

You should receive a message within your terminal that your database was successfully created, as well as a database url, key, and secret. Make note of them, as they will be needed in the following steps.

In order to clone the the repository associated with this API, follow this URL: `https://github.com/migrow/art-api-exam-nolist`

Click the green button labeled "Clone or Download" and copy the URL that appears. From within your terminal, navigate to whichever directory you wish this project to be stored. Run the following command to clone the repository to your local machine: `git clone https://github.com/migrow/art-api-exam-nolist.git`. Next, run the command `npm install` or  `npm i`  in order to install all dependencies associated with this repository.

In order to make reference within the API to the database you created, you will need to create an environment file to store your database url, key, and secret. Open your favorite text editing application and create a file named `.env`. Within that file, follow this command:

`COUCHDB_URL=https://<database key>:<database secret>@<rest of database url>`

To clarify, `https://` will come from the database URL you copied. Then you will paste in your database key as shown, followed by `:` and the paste in your database secret, followed by `@`. You will also want to establish a port for this API to run from in you `.env` file. The default port set in the `api.js` file is 4000, meaning if the port you set is not found, 4000 will be used in its stead. The command will look like this:

`PORT=<port number>`

You should already have a `.gitignore` file, and within that file should appear the text `.env`. This will prevent your database key and secret from being included in your repository should it ever be made public, as it would after being uploaded to GitHub.

## Loading the Database
In order to load the data from this repository into your database, run the command `npm run load` within your terminal. A successful `load` command will show an array of objects in your terminal, each containing `ok`, `id`, and `rev` properties.
```
  { ok: true,
    id: 'artist_pierre-auguste-renoires',
    rev: '1-9cdca9f890984d988be567a18cdd613f' }
```
To verify the load was successful, you can open the database (in this example named art-api) and check that the documents are there.

## Starting the api
To run the API, simply type the command `npm start` in your terminal. A message reading `ART API IS UP on port <port number>` should appear. The API is now operational. Verify this by typing `http://localhost:<port number>/` in your browser. The message "Welcome to the Art API" will appear.

## Basics

The Art API is a RESTful API utilizing JSON with information on certain paintings and the artists who painted them.

## Base URL
All endpoints within the Art API are located at the following base URL: `http://localhost:<port number>/`

Within this address, you'll find a two separate APIs: one for paintings, `/paintings`, and another for artists, `/artists`. Within both API, you'll find a collection of endpoints that allow you to retrieve, update, delete, or create an artist or painting.

## Scheme
The Art API operates exclusively over HTTP.

## HTTP Verbs
The Art API uses the following HTTP commands:
- `GET`: used to retrieve a specific painting or artist from the endpoint `/paintings/:id` or `/artists/:id`. It can also be used to retrive a list of artists or paintings at the endpoint `/artists` or `/paintings`.
- `POST`: used to create a painting or artist at the endpoint `/paintings` or `/artists`
- `PUT`: used to update a painting or artist at the endpoint `/paintings/:id` or `/artists/:id`
- `DELETE`: used to delete a painting or artist at the endpoint `/paintings/:id` or `/artists/:id`

## Paintings

## Create a Painting
Create a painting via `POST` to the `/paintings` endpoint, passing in a JSON object in the request body. The `name`, `artist`, `movement`, `museum` and `yearCreated` properties are required.
```
POST /paintings
{
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Dali",
    "yearCreated": 1931,
    "museum": {
        "name": "Musuem of Modern Art",
        "location": "New York"
    }
```
When successfully created, the response body will include the `ok`, `rev`, and `id` properties.
```
{
    "ok": true,
    "id": "painting_persistence-of-memory",
    "rev": "1-3c6907dec0b842f8a1ce6623aef13ac4"
}
```
## Get a Painting
Get a painting via `GET` from the `/paintings/:id` route, passing in the ID.
```
GET /paintings/persistence-of-memory
```
When this is called, a successfully found painting will result in the painting returned in the response body, which will include the `_id` and `_rev` properties.
```
{
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Dali",
    "yearCreated": 1931,
    "museum": {
        "name": "Musuem of Modern Art",
        "location": "New York"
    },
    "_id": "painting_the-persistence-of-memory",
    "_rev": "35-beb769f4ab2c4d48bba9694998dd320e"
}
```

## Delete a Painting
Delete a painting from the collection of paintings via `DELETE` to the `/paintings/:id` path.
```
DELETE /paintings/painting_persistence-of-memory
```
This will result in a response body which includes the properties `ok`, `id`, and `rev`.
```
{
    "ok": true,
    "id": "painting_the-persistence-of-memory",
    "rev": "36-232ff78dcd2f49c5bb438f52e2e2f291"
}
```

## Update a Painting
Update a painting with a `PUT` call to the `/paintings/:id` path. Provide a representation of the painting in the request body. Be sure to include the most recent `_rev` property or you'll receive a `409 Conflict` error. All fields will be required, including `_id`, `_rev`, `name`, `movement`, `artist`, `yearCreated`, and `museum`.
```
{
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Perez",
    "yearCreated": 1931,
    "museum": {
        "name": "Museum of Modern Art",
        "location": "New York"
    },
    "type": "painting",
    "_id": "painting_persistence-of-memory",
    "_rev": "34-1dff64771e8e40988349f8a61674386c"
}
```
A successfully updated painting will result in a response body with `ok`, `id`, and `rev` properties.
```
{
    "ok": true,
    "id": "painting_persistence-of-memory",
    "rev": "35-232ff78dcd2f49c5bb438f52e2e2f291"
}
```

## Artists

## Create an Artist
Create an artist via `POST` to the `/artists` endpoint, passing in a JSON object in the request body. The `name`, `country`, `birthYear`, and `deathYear` properties are required.

```
POST /artists
{
    "name": "Salvador Dali",
    "country": "Spain",
    "birthYear": 1904,
    "deathYear": 1931
}
```
When successfully created, the response body will include the `ok`, `rev`, and `id` properties.
```
{
    "ok": true,
    "id": "artist_salvador-dali",
    "rev": "1-54b428a8ad014546a58566b76bcaa544"
}
```

## Get an Artist
Get an artist via `GET` from the `/artists/:id` route, passing in the ID.
```
GET /artists/artist_salvador-dali
```
When this is called, a successfully found artist will result in the artist returned in the response body, which will include the `_id` and `_rev` properties.
```
{
    "name": "Salvador Dali",
    "country": "Spain",
    "birthYear": 1904,
    "deathYear": 1931,
    "type": "artist",
    "_id": "artist_salvador-dali",
    "_rev": "3-54b428a8ad014546a58566b76bcaa544"
}
```

## Delete an Artist
Delete an artist from the collection of artists via `DELETE` to the `/artists/:id` path.
```
DELETE /artists/artist_salvador_dali
```
This will result in a response body which includes the properties `ok`, `id`, and `rev`.
```
{
    "ok": true,
    "id": "artist_salvador-dali",
    "rev": "4-874a9f326b604b919aa3c73176ed9b79"
}
```

## Update an Artist
Update an artist with a `PUT` call to the `/artists/:id` path. Provide a representation of the artist in the request body. Be sure to include the most recent `_rev` property or you'll receive a `409 Conflict` error. All fields will be required, including `_id`, `_rev`, `name`, `country`, `birthYear`, and `deathYear`.
```
{
    "name": "Salvador Dali",
    "country": "Espana",
    "birthYear": 1904,
    "deathYear": 1931,
    "type": "artist",
    "_id": "artist_salvador-dali",
    "_rev": "3-54b428a8ad014546a58566b76bcaa544"
}
```
A successfully updated artist will result in a response body with `ok`, `id`, and `rev` properties.
```
{
    "ok": true,
    "id": "artist_salvador-dali",
    "rev": "5-874a9f326b604b919aa3c73176ed9b79"
}
```

## Content Types
All endpoints within the Art API accept and return JSON-formatted data, exclusively.

## Status Codes
Below are a list of status codes you may encounter when operating the Art API, as well as potential reasons those status codes have been encountered.

`200 OK` - Encountered when a `GET` request is successful. The response body should return whatever resource you were attempting to find. For simplicity, successful `POST` and `PUT` requests will return the same response code, as well as a response body that contains an object with properties `ok`, `id`, and `rev`.

`400 Bad Request` - Encountered when a request is made that is incorrectly formatted, such as missing a required property in an update or create request.

`404 Not Found` - Means a document you are looking for does not exist or cannot be found. This could be caused by searching for an incorrect `id` value or searching an `id` value that doesn't exist.

`409 Conflict` - Encountered when a `PUT` request does not provide the latest `rev` number or trying to `POST` a document with an `id` that already exists.

`500 Internal Server Error` - An error that you will hopefully never encounter, but if you do, something on my end has gone amiss.  
