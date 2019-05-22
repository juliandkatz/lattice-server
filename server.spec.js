const request = require('supertest')
const server = require('./server')
const expect = require('chai').expect

describe('/', () => {
  describe('GET', () => {
    it('returns a 200', done => {
      request(server)
        .get('/')
        .expect(200, done)
    })
  })
})

describe('/movie/search', () => {
  describe('POST', () => {
    it('returns a list of movies', done => {
      request(server)
        .get('/movie/search')
        .query({
          query: 'Toy Story'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.a('string')
          done()
        })
    })
  })
})

describe('/movie/popular', () => {
  describe('GET', () => {
    it('returns a list of movies', done => {
      request(server)
        .get('/movie/popular')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(20)
          done()
        })
    })
  })
})

describe('/movie/someId', () => {
  describe('GET', () => {
    it('returns Hellboy for id 456740', done => {
      request(server)
        .get('/movie/456740')
        .expect(200)
        .end((err, res) => {
          expect(res.body.id).to.be.a('number')
          expect(res.body.title).to.be.a('string')
          done()
        })
    })

    it('returns a 404 for an id that does not exist', done => {
      request(server)
        .get('/movie/01910191019101910191019101')
        .expect(404, done)
    })
  })
})

describe('/movie/someId/casts', () => {
  describe('GET', () => {
    it('returns the cast with the correct first actor', done => {
      request(server)
        .get('/movie/123/cast')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          const firstActor = res.body[0]
          expect(firstActor.name).to.be.a('string')
          done()
        })
    })
  })
})

describe('/discover/movie', () => {
  describe('GET', () => {
    it('returns a list of movies that follow a certain genre', done => {
      request(server)
        .get('/discover/movie')
        .query({ genre: 28 })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          const firstMovie = res.body[0]
          expect(firstMovie.title).to.be.a('string')
          done()
        })
    })
  })
})

describe('/genres', () => {
  describe('GET', () => {
    it('returns a list of genres', done => {
      request(server)
        .get('/genres')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          const firstGenre = res.body[0]
          expect(firstGenre.id).to.be.a('number')
          expect(firstGenre.name).to.be.a('string')
          done()
        })
    })
  })
})
