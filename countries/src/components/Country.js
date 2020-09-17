import React from 'react'
// import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'
import Weather from './Weather'

const Country = ({ country }) => {
  return(
    <div>
      <h1>{ country.name }</h1>
      <p>Capital: { country.capital }</p>
      <p>Population: { country.population }</p>
      <p>Languages:</p>
      <ul>
        { country.languages.map(language => <li key={ uuidv4() }>{ language.name }</li>)}
      </ul>
      <img src={ country.flag } max-width='200px' alt='' />
      <Weather country={ country } />
    </div>
  )
}

export default Country