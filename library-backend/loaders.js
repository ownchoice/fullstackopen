// http://www.petecorey.com/blog/2017/08/14/batching-graphql-queries-with-dataloader/
// alt https://www.robinwieruch.de/graphql-apollo-server-tutorial

const DataLoader = require('dataloader')
// const Author = require('./models/author')
const Book = require('./models/book')

// const authorLoader = new DataLoader((authorNames) => {
//   // #TODO: Implement loader
// })

// const bookLoader = new DataLoader((bedIds) => {
//   // #TODO: Implement loader
// })

const bookCountLoader = new DataLoader(async (authorNames) => {
  const books = await Book.find({})
    .populate('author', {
      name: 1,
    })
  return authorNames.map(
    (name) => books.filter((book) => book.author.name === name).length
  )
})

module.exports = { bookCountLoader }
