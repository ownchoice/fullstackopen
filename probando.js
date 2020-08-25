// const cadena = 'constante'
// const lista = ['uno', 'dos', 786, 13, 45, true, false, 1.25, '87.25', '97']

// lista.push('banana', 'apple', 'peach')
// console.log(lista)

// for (let indice = 0; indice < lista.length; indice++) {
//   const elemento = lista[indice];
//   console.log(elemento)
// }

// lista.forEach((elemento) => {console.log(elemento)})

// lista.forEach(elemento => console.log(elemento))

const fruits = []
fruits.push('banana', 'apple', 'peach')
fruits.length = 10
console.log(fruits)              // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)) // ['0', '1', '2', '5']
console.log(fruits.length)       // 10
console.log(fruits[8])           // undefined
