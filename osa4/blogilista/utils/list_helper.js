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
    const reducer = (author, line) => {
        author[line[3]] = author[line[3]] || []
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    mostFavorite
  }