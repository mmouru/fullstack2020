const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)
    if(body.title === undefined || body.url === undefined){
      return response.status(400).json({error: 'content missing'})
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON()) 
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)
  const blog = await Blog.findById(request.params.id)
  console.log(blog.user)
  if ( blog.user.toString() === decodedToken.id){
    await Blog.findOneAndRemove({_id: request.params.id})
    console.log('deleted')
    response.status(204).end()
  } else {
    return response.status(401).json({ error: "token missing or invalid" })
  }
 
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const updatedLikes = {
    likes: blog.likes === 0 ? blog.likes + 1 : blog.likes * 2
  }
  await Blog.findByIdAndUpdate(request.params.id, updatedLikes)
  response.json(updatedLikes)
})
  module.exports = blogsRouter