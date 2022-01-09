import { app } from '../../app'
import request from 'supertest'
import mongoose from 'mongoose'
import { Post } from '../../models/posts'
import { v4 as uuid } from 'uuid'

const id = uuid()
const postData = {
  _id: id,
  title: 'post title',
  body: 'post body',
  tags: ['tag 1', 'tag1']
}

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

  describe('POST /api/posts', () => {
    it('Should return a Post and return 201', async () => {
      // DB should be empty
      expect(await Post.find()).toHaveLength(0)

      await request(app)
        .post('/api/posts')
        .send({
          title: 'study mobile develop',
          body: 'with react native',
          tags: ['android', 'ios']
        })
        .expect(201)

      // DB should have one item
      expect(await Post.find()).toHaveLength(1)
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
  describe('GET /api/posts', () => {
    it('Should return 200 and all posts', async () => {
      await Post.create(postData)
      await request(app)
        .get('/api/posts')
        .query({ limit: 3, page: 1 })
        .expect(200)
    })
  })
  describe('GET /api/posts/:id', () => {
    it('Should return 200', async () => {
      await Post.create(postData)
      await request(app)
        .get(`/api/posts/${id}`)
        .expect(200)
    })
    it('Should return 400 if an invalid ID is provided', async () => {
      await request(app)
        .get('/api/posts/invalid_id')
        .expect(400)
    })
  })
  describe('UPDATE /api/posts/:id', () => {
    it('Should return 200', async () => {
      await Post.create(postData)
      await request(app)
        .put(`/api/posts/${id}`)
        .send({
          title: 'New title'
        })
        .expect(200)
    })
    it('Should return 400 if an invalid ID is provided', async () => {
      await Post.create(postData)
      await request(app)
        .put('/api/posts/invalid_id')
        .send({
          title: 'New title'
        })
        .expect(400)
    })
  })
  describe('DELETE /api/posts/:id', () => {
    it('Should return 204', async () => {
      await Post.create(postData)
      await request(app)
        .delete(`/api/posts/${id}`)
        .expect(204)
    })
    it('Should return 400 if an invalid ID is provided', async () => {
      await Post.create(postData)
      await request(app)
        .delete('/api/posts/invalid_id')
        .send({
          title: 'New title'
        })
        .expect(400)
    })
  })
})
