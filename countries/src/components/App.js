import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState()
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  console.log(countries)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
      </header>
      <form>
        <p>Find countries: <input></input></p>
    </form>
    </div>
  );
}

export default App;
