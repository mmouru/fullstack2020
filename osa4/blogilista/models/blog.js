const mongoose = require('mongoose')

const mongoUrl = `mongodb+srv://mmouruja19:${process.env.PASSW}@cluster0-n6czm.mongodb.net/blog?retryWrites=true&w=majority`

mongoose.set('useFindAndModify', false)

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const blogSchema = mongoose.Schema({
    url: {type: String, required: true},
    title: {type: String, required: true},
    author: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },  
    likes: {type: Number, default : 0}
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
      delete returnedObject.id
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)