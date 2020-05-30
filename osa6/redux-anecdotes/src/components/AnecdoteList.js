import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const compareVotes = (a, b) => {
        return b.votes - a.votes
      }
      const filter = useSelector(state => state.filter)
      const topAnecdotes = useSelector(state => state.anecdotes.sort(compareVotes))
      const anecdotes = topAnecdotes.filter(anecdote => anecdote.content.includes(filter))
      const dispatch = useDispatch()
    
      const vote = (anecdote) => {
        const id = anecdote.id
        console.log('vote', id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
        
      }

    return (
        <div>
             {anecdotes.map(anecdote =>
              <div key={anecdote.id}>
              <div>
              {anecdote.content}
              </div>
            <div>
              has {anecdote.votes}
             <button onClick={() => vote(anecdote)}>vote</button>
             </div>
             </div>
          )}
        </div>
    )
}

export default AnecdoteList