import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}/>
      <Content part={props.course.parts}/>
    </div>
  )
}

const Header = (props) => {
    return (
    <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <div>
          {props.part.map((part, i) =>
          <p key={i}>
            {props.part[i].name} {props.part[i].exercises}
          </p>
          )}
        </div>
    )
}

const Content = (props) => {
  const sum = props.part.reduce(( sum,  {exercises}) => sum + exercises, 0)
    return (
      <div>
        <Part part={props.part} />
        <b>total of {sum} exercises</b>
      </div>
    )
  }


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

