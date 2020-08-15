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


import React from 'react'
import ReactDOM from 'react-dom'

const Fruta = (props) => {
  return (
    <div>
      <p>Tengo una {props.name}, de color {props.color}, que pesa {props.weight} y es {props.adjective}.</p>
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
      <p>The time is: {now.toString()}</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
