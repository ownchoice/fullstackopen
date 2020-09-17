import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SearchResults from './SearchResults'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        // console.log('Datos cargados')
      })
  }
  useEffect(hook, [])

  // console.log(countries)


  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log('preventDefault')
  }
  
  const [ searchQuery, setSearchQuery ] = useState('')
  const onChangeHandler = (event) => {
    console.log(event.target.value)
    setSearchQuery(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
      </header>
      <form onSubmit={ onSubmitHandler } >
        <p>Find countries: <input value={searchQuery} onChange={ onChangeHandler } ></input></p>
        <SearchResults countries={ countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase())) } setSearchQuery={setSearchQuery} />
    </form>
    </div>
  );
}

export default App;
