import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/message'
import './App.css'
import './components/toggle'
import Togglable from './components/toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const noteFormRef = React.createRef()

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const user = {
          username: blogObject.user.username,
          id: blogObject.user.id,
          name: blogObject.user.name
        }
        Object.assign(returnedBlog.user = user)
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      blogs.sort(compareLikes)
    ).then(blogs => setBlogs(blogs))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = (id) => {
    const blog = blogs.find(n => n._id === id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        const user = {
          username: blog.user.username,
          id: blog.user.id,
          name: blog.user.name
        }
        Object.assign(returnedBlog.user = user)
        setBlogs(blogs.map(blog => blog._id !== id ? blog : returnedBlog))
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find(n => n._id === id)
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm){
      blogService
        .remove(blog._id)
        .then(response => {
          setBlogs(blogs.filter(blog => blog._id !== id))
        })
    }
  }


  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel="new blog" ref={noteFormRef} id='newblog'>
        <form onSubmit={addBlog}>
          <BlogForm createBlog={addBlog}/>
        </form>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog._id)} removeBlog={() => {removeBlog(blog._id)}}/>
      )}
    </div>
  )

}

export default App