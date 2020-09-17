import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  
  const api_key = process.env.REACT_APP_API_KEY
  const api_url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}&units=m`
  console.log(api_url)
  // const [ weather, setWeather ] = useState()
  const [ weather, setWeather ] = useState({
    current: {
      weather_descriptions: ['loading',],
      weather_icons: ['https://media1.tenor.com/images/b213dc57bfa0ff88ca7522139c937acf/tenor.gif?itemid=17305985',],
      wind_speed: 'loading',
      wind_dir: 'loading',
    }
  })

  const hookWeather = () => {
    axios
      .get(api_url)
      .then(response => {
        setWeather(response.data)
        // console.log(weather.current.weather_descriptions)
      })
  }
  useEffect(hookWeather, [])
  // console.log(weather.current.weather_descriptions)
  // console.log(weather.current.weather_descriptions[0])
  // console.log(weather.current.weather_icons)
  // console.log(weather.current.weather_icons[0])

  return(
    <div>
      <h2>Weather in { country.name }</h2>
      <p><strong>Temperature:</strong> { weather.current.weather_descriptions[0] }</p>
      <img src={ weather.current.weather_icons[0] } max-width='200px' alt='' />
      <p><strong>Wind:</strong> { weather.current.wind_speed } km/h direction { weather.current.wind_dir }</p>
    </div>
  )
}

export default Weather