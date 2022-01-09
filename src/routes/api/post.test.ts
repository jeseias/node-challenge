import { app } from '../../app'
import request from 'supertest'
import mongoose from 'mongoose'
import { Post } from '../../models/posts'

describe('Post Routes', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/jest')
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await Post.deleteMany()
  })

  describe('Post /posts', () => {
    it('Should return a Post on 201', async () => {
      await request(app)
        .post('/api/posts')
        .send({
          title: 'study mobile develop',
          body: 'with react native',
          tags: ['android', 'ios']
        })
        .expect(201)
    })
    it('Should return 400 if no title is not provided', async () => {
      await request(app)
        .post('/api/posts')
        .send({
          body: 'with react native',
          tags: ['android', 'ios']
        })
        .expect(400)
    })
    it('Should return 400 if no body is not provided', async () => {
      await request(app)
        .post('/api/posts')
        .send({
          title: 'study mobile development',
          tags: ['android', 'ios']
        })
        .expect(400)
    })
    it('Should return 400 if no tags is not provided', async () => {
      await request(app)
        .post('/api/posts')
        .send({
          title: 'study mobile development',
          body: 'with react native'
        })
        .expect(400)
    })
  })
})
