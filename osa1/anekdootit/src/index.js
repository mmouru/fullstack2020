import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>{props.text}</button>
        </div>
    )
}


const Button2 = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>{props.text}</button>
        </div>
    )
}

const Stats = (props) => {
    return (
        <div>
            has {props.votes} votes
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const random = () => setSelected(Math.floor(Math.random() * 6))
  const points = new Array(7).join('0').split('').map(parseFloat)
  const copy = [...points]
  // kasvatetaan taulukon paikan 2 arvoa yhdellä
  const increase = () => {
      copy[selected] += 1
      console.log(copy) 

  }   
  return (
    <div>
      {console.log(copy)}
      {props.anecdotes[selected]}
      <Stats votes={copy[selected]} />
      <Button2 handleClick={increase} text="vote"/>
      <Button handleClick={random} text="next anecdote"/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
