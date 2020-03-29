const mongoose = require('mongoose')

const mongoUrl = 'mongodb+srv://mmouruja19:hyo88000@cluster0-n6czm.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  module.exports = mongoose.model('Blog', blogSchema)