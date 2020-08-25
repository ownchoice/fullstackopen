// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Fruta = ({ name, color, weight, adjective}) => {
  return (
    <div>
      <p>Tengo una <strong>{name}</strong>, de color <strong>{color}</strong>, que pesa <strong>{weight}</strong> y es <strong>{adjective}</strong>.</p>
    </div>
  )
}

const MombreAleatorio = () => {
  const generarNombre = () => {
    const nombres_mujer = ['Marta', 'Lucía', 'Gabriela', 'Natalia', 'Rosa', 'Violeta']
    const nombre = nombres_mujer[Math.floor(Math.random() * nombres_mujer.length)]
    return nombre
  }
  const [ counter, setCounter ] = useState(0)
  const handleClick = () => {
    setCounter(counter + 1)
  }

  return (
    <div>
      <p>El nombre generado es <strong>{generarNombre()}</strong> <button onClick={handleClick}>Generar otro</button></p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const fruta1 = {
    nombre: "pera",
    color: "amarillo",
    peso: "51 gr",
    adjetivo: "suave",
  }
  return (
    <div>
      <h1>Greetings</h1>
      <Fruta name="manzana" color="rojo" weight="43 gr" adjective="deliciosa" />
      <Fruta name="naranja" color="naranja" weight="35 gr" adjective="jugosa" />
      <Fruta name={fruta1.nombre} color={fruta1.color} weight={fruta1.peso} adjective={fruta1.adjetivo} />
      <p>La hora actual es <strong>{now.toString()}</strong>.</p>
      <MombreAleatorio></MombreAleatorio>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
