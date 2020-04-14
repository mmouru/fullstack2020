const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}  

const mostFavorite = blogs => {
    const reducer = (previousValue, nextValue) => {
        return previousValue.likes < nextValue.likes
        ? {'title': nextValue.title, 'author': nextValue.author, 'likes': nextValue.likes}
        : {'title': previousValue.title, 'author': previousValue.author, 'likes': previousValue.likes}
    }
    return blogs.reduce(reducer)
}

const mostBlogs = blogs => {
    const obj = new Object();
    _.forEach(blogs, function(blog) {
        obj[blog.author] = (obj[blog.author] || 0) + 1
    })
    const mostBlogsAuthor = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
    const comparingObject = new Object();
    comparingObject.author = mostBlogsAuthor
    comparingObject.blogs = obj[mostBlogsAuthor]
    return comparingObject

}

const mostLikes = blogs => {
    const obj = new Object()
    _.forEach(blogs, function(blog) {
        obj[blog.author] = (obj[blog.author] || 0) + blog.likes
    })
    const mostLikesAuthor = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
    const comparingObject = new Object();
    comparingObject.author = mostLikesAuthor
    comparingObject.likes = obj[mostLikesAuthor]
    return comparingObject
}
  
  module.exports = {
    dummy,
    totalLikes,
    mostFavorite,
    mostBlogs,
    mostLikes
  }