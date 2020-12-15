import React from 'react'
import { connect } from 'react-redux'
import { setFilter, removeFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    if (event.target.value === '') {
      props.removeFilter()
    } else {
      props.setFilter(event.target.value)
    }
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
  removeFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
