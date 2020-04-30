import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const ifOwnsBlog = (blogOwner) => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).username
    if( loggedInUser === blogOwner || loggedInUser === blog.user){
      return null
    } else { return ({ display: 'none' })}
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    console.log(blog)
  }

  if(!visible){
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} onClick={toggleVisibility} className='button'>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  } return (
    <div style={blogStyle}>
      <div style={showWhenVisible} id='show'>
        <b onClick={toggleVisibility}>{blog.title}</b> <br></br>
        {blog.url} <br></br>
        likes {blog.likes} <button onClick={likeBlog} id='like'>like</button> <br></br>
        {blog.author} <br></br>
        <button style={ifOwnsBlog(blog.user.username)} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
