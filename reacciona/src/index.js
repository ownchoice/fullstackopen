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
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
const shortid = require('shortid');



const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

promise.then(response => {
  console.log(response)
})

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)


const Fruta = ({ fruit, toggleFruit }) => {
  const { nombre, color, peso, adjetivo, disponible } = fruit
  const handleToggleFruit = () => {
    toggleFruit(fruit.id)
  }
  return (
  <p><button onClick={() => {toggleFruit(fruit.id)}}>X</button> { disponible ? '✔️' : '❌' } Tengo una <strong>{nombre}</strong>, de color <strong>{color}</strong>, que pesa <strong>{peso}</strong> y es <strong>{adjetivo}</strong>.</p>
  )
}


const MombreAleatorio = () => {
  const generarNombre = () => {
    const nombres_mujer = ['Marta', 'Lucía', 'Gabriela', 'Natalia', 'Rosa', 'Violeta', 'María', 'Marisol', 'Yennefer', 'Ciri', 'Gerald']
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


const crearFruta = (nom, col, adj, disp) => {
  return {
    id: shortid.generate(),
    nombre: nom,
    color: col,
    peso: Math.trunc(Math.random() * (110 - 20) + 20) + " gr",
    adjetivo: adj,
    disponible: disp,
  }
}


const FrutasLista = () => {
  const frutasLista = [
    crearFruta("damasco", "naranja", "rústico", true),
    crearFruta("mango", "amarillo", "saludable", false),
    crearFruta("frutilla", "roja", "exótica", true),
    crearFruta("ananá", "naranja", "codiciada", false),
    crearFruta("pomelo", "amarillo", "jugoso", true),
  ]
  const [ fruits, setFruits ] = useState(frutasLista)
  const toggleFruit = (id) => {
    const newFruits = [...fruits]
    const thisFruit = newFruits.find(fruit => fruit.id === id)
    thisFruit.disponible = !thisFruit.disponible
    setFruits(newFruits)
  }
  return (
    <>
    { fruits.map((fruit) => <Fruta key={fruit.id} fruit={fruit} toggleFruit={toggleFruit} />) }
    </>
  )
}


const App = () => {
  const now = new Date()
  

  return (
    <div>
      <h1>Greetings</h1>
      <FrutasLista />
      <p>La hora actual es <strong>{now.toString()}</strong>.</p>
      <MombreAleatorio />
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
