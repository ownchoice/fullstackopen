// import React, { useState, useEffect } from 'react';
import React from 'react'
import Country from './Country'
import { v4 as uuidv4 } from 'uuid'

const SearchResults = (props) => {
  // console.log('Hasta aquí llega')
  // console.log(props.countries)

  // const showCountryHandler = (event) => {
  //   set
  // }

  if (props.countries.length === 0) {
    return(<p>Type something</p>)
  } else if (props.countries.length === 1) {

    return (<Country country={ props.countries[0] } />)
  } else if (props.countries.length > 1 && props.countries.length < 11) {
    return(
      <div>{ props.countries.map(country => <p key={ uuidv4() }>{ country.name } <button onClick={ () => { props.setSearchQuery(country.name) } }>show</button></p>) }</div>
    )
  } else {
    return (
      <p>Too many results, specify another filter.</p>
    )
  }
}

export default SearchResults