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

To clarify, `https://` will come from the database URL you copied. Then you will paste in your database key as shown, followed by `:` and the paste in your database secret, followed by `@`.

Be sure to the create a file named `.gitignore` and within that file add the text `.env`. This will prevent your database key and secret from being included in your repository should it ever be made public, as it would after being uploaded to GitHub.

## Loading the Database
In order to load the data from this repository into your database, run the command `npm run load` within your browser. A successful `load` command will show an array of objects in your terminal, each containing information either on a painting or an artist. To verify the load was successful, you can open the database (in this example named art-api) and check that the documents are there.

## Starting the api
To run the API, simply type the command `npm start` in your terminal. A message reading `ART API IS UP on port 4000` should appear. The API is now operational. Verify this by typing `http://localhost:4000/` in your browser. The message "Welcome to the Art API" will appear.

## Basics

The Art API is a RESTful API utilizing JSON with information on certain paintings and the artists who painted them.

### Base URL
All endpoints within the Art API are located at the following base URL: `http://localhost:4000/`

Within this address, you'll find a two separate APIs: one for paintings, `/paintings`, and another for artists, `/artists`. Within both API, you'll find a collection of endpoints that allow you to retrieve, update, delete, or create an artist or painting.

### Scheme
The Art API operates over HTTP.

### HTTP Verbs
The Art API uses the following HTTP commands:
- `GET`: used to retrieve a specific painting or artist from the endpoint `/paintings/:id` or `/artists/:id`
- `POST`: used to create one painting or artist at the endpoint `/paintings` or `/artists`
- `PUT`: used to update a painting or artist at the endpoint `/paintings/:id` or `/artists/:id`
- `DELETE`: used to delete a painting or artist at the endpoint `/paintings/:id` or `/artists/:id`

### Content Types
All endpoints within the Art API accept and return JSON-formatted data, exclusively.

### Status Codes
Below are a list of status codes you may encounter when operating the Art API, as well as potential reasons those status codes have been encountered.

`200 OK` - Encountered when a `GET` request is successful. The response body should return whatever resource you were attempting to find. For simplicity, successful `POST` and `PUT` requests will return the same response code, as well as a response body that contains an object with properties `ok`, `id`, and `rev`.

A successful `GET` of a painting will look something like this:
`{
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Dali",
    "yearCreated": 1931,
    "museum": {
        "name": "Musuem of Modern Art",
        "location": "New York"
    },
    "type": "painting",
    "_id": "painting_persistence-of-memory",
    "_rev": "28-3c6907dec0b842f8a1ce6623aef13ac4"
}`

A successful `POST` or `PUT` will look something like this:
`{
    "ok": true,
    "id": "painting_-persistence-of-memory",
    "rev": "28-3c6907dec0b842f8a1ce6623aef13ac4"
}`

`400 Bad Request` - Encountered when a request is made that is incorrectly formatted, such as missing a required property in an update or create request.

`404 Not Found` - Means a document you are looking for does not exist or cannot be found. This could be caused by searching for an incorrect `id` value or searching an `id` value that doesn't exist.

`409 Conflict` - Encountered when a `PUT` request does not provide the latest `rev` number or trying to `POST` a document with an `id` that already exists.

`500 Internal Server Error` - An error that you will hopefully never encounter, but if you do, something on my end has gone amiss.  
