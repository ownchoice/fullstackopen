import React, { useState } from 'react'
// import logo from './logo.svg';
import './App.css';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistic = (props) => (
  <li>
    {props.text}: {props.value}
  </li>
)


const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <p>
      <ul>
        <Statistic text={"Good"} value={good} />
        <Statistic text={"Neutral"} value={neutral} />
        <Statistic text={"Bad"} value={bad} />
        <li>All: {total}</li>
        {console.log(bad * -1)}
        <li>Average: {(good - bad) / (total)}</li>
        <li>Positive: {(good * 100) / total}%</li>
      </ul>
    </p>
  )
  }

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
    <h1>
      Unicafe
    </h1>
    <h2>
      Give feedback
    </h2>
    <div>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
    </div>
    <h2>
      Statistics
    </h2>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
