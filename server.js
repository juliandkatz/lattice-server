// Modules
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const apicache = require('apicache') // Server-side caching
// apicache.options({ debug: true }) // Turn on to display caching logs

// Config
const result = require('dotenv').config()
if (result.error) { throw result.error }
const port = 4000

// Setup
const server = express()
server.use(cors({ origin: 'http://localhost:3000' }))
server.use(apicache.middleware('5 minutes'))

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.API_KEY,
    language: 'en-US'
  }
})

// ROUTES
server.get('/', (req, res) => res.send('Hello World!'))

server.get('/movie/search', async (req, res) => {
  const response = await instance.get('/search/movie', { params: { query: req.query.query } })
  res.send(response.data.results)
})

server.get('/movie/popular', async (req, res) => {
  const response = await instance.get('/movie/popular')
  res.send(response.data.results)
})

server.get('/movie/:id', async (req, res) => {
  const response = await instance.get(`/movie/${req.params.id}`)

  if (response.data.status_code === 6) {
    res.sendStatus(404)
  } else {
    res.send(response.data)
  }
})

server.get('/movie/:id/cast', async (req, res) => {
  const response = await instance.get(`/movie/${req.params.id}/casts`)
  res.send(response.data.cast)
})

server.get('/genres', async (req, res) => {
  const response = await instance.get('/genre/movie/list')
  res.send(response.data.genres)
})

server.get('/discover/movie', async (req, res) => {
  const response = await instance.get('/discover/movie', { params: { with_genres: req.query.genre } })
  res.send(response.data.results)
})

server.get('/genres')

// START SERVER
if (process.env.TEST !== 'true') { // This is to prevent .listen() invocations during tests
  server.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

// EXPORT FOR TESTING
module.exports = server
