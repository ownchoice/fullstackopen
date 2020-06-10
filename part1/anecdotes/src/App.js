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
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length));
  const handleVote = (anecdoteIndex) => {
    const newVotes = [...votes];
    newVotes[anecdoteIndex] += 1;
    setVotes(newVotes)
    getMostVoted(newVotes)
  }
    
  const [mostVoted, setMostVoted] = useState(0);

  const getMostVoted = (votesArray) => {
    const mostVotes = Math.max(...votesArray)
    for (var i = 0; i < votesArray.length; i++) {
      if (votesArray[i] === mostVotes) {
        setMostVoted(i);
      }
    }
  }

  return (
    <div>
      <p>
        <em>{props.anecdotes[selected]}</em>
      </p>
      <p>
        This anecdote has {votes[selected]} votes.
      </p>
      <Button handleClick={() => setSelected(getRndInteger(0, props.anecdotes.length))} text="Random" />
      <Button handleClick={() => handleVote(selected)} text="Vote" />
      <h2>Anecdote with most votes</h2>
      <p>
        <em>{props.anecdotes[mostVoted]}</em>
      </p>
      <p>
        With {votes[mostVoted]} votes.
      </p>
    </div>
  )
}

export default App;
