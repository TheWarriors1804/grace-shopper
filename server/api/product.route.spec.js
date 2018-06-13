/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('User GET Product Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/products', () => {
    const price1 = 500.0
    beforeEach(() => {
      return Product.create({
        price: price1,
        model: 'XXXX'
      })
    })

    it('GET /api/products', () => {
      try {
        return request(app)
          .get('/api/products')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].price).to.be.equal('500.00')
          })
      } catch (err) {
        console.log(err)
      }
    })
  })

  describe('GET /api/products/:id', () => {
    beforeEach(() => {
      return Product.bulkCreate([
        {
          price: 99.99,
          model: 'X01'
        },
        {
          price: 100.5,
          model: 'X02'
        }
      ])
    })

    it('GET /api/products/1', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.price).to.be.equal('99.99')
        })
    })

    it('GET /api/products/2', () => {
      return request(app)
        .get('/api/products/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.price).to.be.equal('100.50')
        })
    })
  })
})
