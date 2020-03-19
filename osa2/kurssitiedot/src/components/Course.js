import React from 'react'

const Course = (props) => {
    return (
      <div>
        {props.course.map((course, i) =>
        <div key={i}>
          <Header course={props.course[i].name}/>
          <Content part={props.course[i].parts}/>
        </div>
        )}
      </div>
    )
  }
  
  const Header = (props) => {
      return (
      <h2>{props.course}</h2>
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

export default Course