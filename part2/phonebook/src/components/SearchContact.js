import React from 'react'

const SearchContact = ( { filter, handleFilter } ) => {
  return (
    <p>Filter shown with: <input value={filter} onChange={handleFilter}></input></p>
  )
}

export default SearchContact