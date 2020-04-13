const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log("body", body)
  if(body.password === undefined){
    return response.status(400).json({error: 'User must have a password'})
  }
  else if(body.password.length < 3){
    return response.status(400).json({error: 'Password must be 3 charecters long'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  try {
    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch(exception) {
    next(exception)
  }
    
})

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', {url : 1, title: 1, author: 1})

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter