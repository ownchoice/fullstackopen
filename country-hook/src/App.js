import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    findCountry(name)
  }, [name])

  const findCountry = async (name) => {
    if (name === '') {
      setCountry({ data: null, found: false })
      return
    }
    const url = `https://restcountries.eu/rest/v2/name/${encodeURI(
      name
    )}?fullText=true`
    try {
      const response = await axios.get(url)
      setCountry({ data: response.data[0], found: true })
      // console.log({ data: response.data[0], found: true })
    } catch {
      setCountry({ data: null, found: false })
    }
  }

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    // console.log('submit ' + nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
