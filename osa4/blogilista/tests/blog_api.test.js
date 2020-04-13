const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tst_helper')
const app = require('../App')
const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(30000)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

  test('get response returns 2 blogs', async () => {
      const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(blogs.body).toHaveLength(2)
  })

  test('a valid blog can be added ', async () => {
       const newBlog = {
           title: "jouluisa pukki",
           author: "mmouru",
           url: "www.rhk.arkku.net",
           likes: 0
       }

       await api
       .post('/api/blogs')
       .send(newBlog)
       .expect(201)

       const blogs = await helper.blogsInDb()
       expect(blogs).toHaveLength(2 + 1)

       const titles = blogs.map(blog => blog.title)

       expect(titles).toContain(
           'jouluisa pukki'
       )

  })

  test('blog without likes returns likes zero', async () => {
      const newBlog = {
          title: "koronakoronakorona",
          author: "mmouru",
          url: "joulujoulujoulu",
      }

      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(2 + 1)

      const likes = blogs.map(blog => blog.likes)
      likes.forEach( (amount) => {
          console.log(amount)
          expect(amount).toBeDefined()
      })
  })

  test('blog without title and url returns bad request', async () => {
      const newBlog = {
          author: "mmouru"
      }

      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog can be deleted', async () => {
      const blogs = await helper.blogsInDb()
      const blogToDelete = blogs[0]
      console.log(blogToDelete)
      console.log(blogToDelete._id)

      await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(2-1)
  })

afterAll(() => {
  mongoose.connection.close()
})