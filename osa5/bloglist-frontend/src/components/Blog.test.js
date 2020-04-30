import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('tests for the blogs', () => {

  const user = {
    username: 'testuser',
    name: 'testuser'
  }

  window.localStorage.setItem(
    'loggedNoteappUser', JSON.stringify(user)
  )

  const newBlog = {
    title: 'testijuttu',
    url: 'testiosoite',
    author: 'testikayttaja2',
    user: {
      id: '5e947aae2eaa3d23b2815c4f',
      username: 'testikayttaja2'
    }
  }

  test('renders only title and author when not clicked on post', () => {

    const component = render(
      <Blog blog={newBlog} />
    )
    expect(component.container).toHaveTextContent(
      'testijuttu'
    )
    expect(component.container).toHaveTextContent(
      'testikayttaja2'
    )
    expect(component.container).not.toHaveTextContent(
      'testiosoite'
    )
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })

  test('renders everything when clicked on the post', async () => {

    const component = render(
      <Blog blog={newBlog} />
    )

    const div = component.container.querySelector('.button')
    fireEvent.click(div)

    expect(component.container).toHaveTextContent(
      'testiosoite'
    )
    expect(component.container).toHaveTextContent(
      'testikayttaja2'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
    expect(component.container).toHaveTextContent(
      'testijuttu'
    )
  })

  test('callback twice', async () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={newBlog} likeBlog={mockHandler} />
    )

    const div = component.container.querySelector('.button')
    fireEvent.click(div)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
