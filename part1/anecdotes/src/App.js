import React, { useState } from 'react'
// import logo from './logo.svg';
// import './App.css';

// https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  return (
    <div>
      <p>
        {props.anecdotes[selected]}
      </p>
      <Button handleClick={() => setSelected(getRndInteger(0, props.anecdotes.length))} text="Random" />
      <p>{selected}</p>
    </div>
  )
}

export default App;
