import React, { useState } from 'react'
import ReactDOM from 'react-dom'
 
const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const Statistics = (props) => {
    return(
      <table>
        <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.all} />
        <StatisticLine text="average" value ={props.average} />
        <StatisticLine text="positive" value ={props.positive} />
        </tbody>
      </table>
    )
  }

const StatisticLine = (props) => {
if (props.text === "positive") {
    return (
    <tr>
    <td>
        {props.text}
    </td>
    <td>
         {props.value}%
    </td>
    </tr>
    )
}
    return (
    <tr>
    <td>
        {props.text} 
    </td>
    <td>
        {props.value}
    </td>
    </tr>
)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

const increaseGood = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
}
const increaseNeutral = () => {
    setNeutral(neutral +1)
    setAll(allClicks + 1)
}
const increaseBad = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
}
if (allClicks === 0) {
    return (
        <div>
          <h1>give feedback</h1>
          <Button handleClick={increaseGood} text={"good"} />
          <Button handleClick={increaseNeutral} text={"neutral"} />
          <Button handleClick={increaseBad} text={"bad"} />
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
    )
}

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text={"good"} />
      <Button handleClick={increaseNeutral} text={"neutral"} />
      <Button handleClick={increaseBad} text={"bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks} average={(good - bad) / allClicks} positive={good / allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)