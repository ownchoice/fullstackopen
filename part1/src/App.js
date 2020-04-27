import React from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  return(
    <div>
      <p>Buenos días señor {props.name}, su edad es {props.age} años.</p>
    </div>
  );
}

function App() {
  console.log('Componente: esto funciona correctamente.')
  const age = 28
  const name = 'Dayo'
  return (
    <div>
      <h1>Bienvenidos</h1>
        <Hello name="Muzska" age="31" />
        <Hello name="Alex" age={age} />
        <Hello name="Felipe" age={12 + 12} />
        <Hello name={name} age="27" />
      </div>
  );
}

export default App;
