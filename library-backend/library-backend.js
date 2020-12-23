const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int
    author: Author
    genres: [String]
    id: ID!
  }

  type Author {
    born: Int
    name: String!
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      author: String
      published: Int
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.count(),
    authorCount: () => Author.count(),
    allBooks: (root, args) => {
      let booksToReturn = Book.find({})
      if (args.author) {
        booksToReturn = booksToReturn.filter(
          (book) => book.author === args.author
        )
      }
      if (args.genre) {
        booksToReturn = booksToReturn.filter((book) =>
          book.genres.includes(args.genre)
        )
      }
      return booksToReturn
    },
    allAuthors: () => Author.find({}),
  },
  Mutation: {
    addAuthor: (root, args) => {
      if (!args.name) {
        throw new UserInputError('Name must be provided', {
          invalidArgs: args.name,
        })
      }
      // if ('author already exists') {
      //   throw new UserInputError('Name must be unique', {
      //     invalidArgs: args.name,
      //   })
      // }
      const newAuthor = new Author({ ...args })
      return newAuthor.save()
    },
    addBook: async (root, args) => {
      let { author: authorName, ...book } = args
      const authorFound = await Author.findOne({ name: authorName })
      if (authorFound === null) {
        const newAuthor = new Author({ name: authorName })
        const savedAuthor = await newAuthor.save()
        // console.log('author created', savedAuthor)
        book.author = savedAuthor.id
      } else {
        book.author = authorFound.id
        // console.log('author found', authorFound)
      }
      let newBook = new Book({ ...book })
      let savedBook = await newBook.save()
      // console.log(newBook.populate('author'))
      // console.log(savedBook.populate('author'))
      // console.log(
      //   newBook.populate('author', {
      //     name: 1,
      //     born: 1,
      //   })
      // )
      // console.log(
      //   savedBook.populate('author', {
      //     name: 1,
      //     born: 1,
      //   })
      // )
      // console.log(newBook)
      // console.log(savedBook)

      // shouldn't have to find it!
      const finalBook = await Book.findById(savedBook.id).populate('author', {
        name: 1,
        born: 1,
      })
      // console.log(finalBook)
      return finalBook
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name)
      if (author) {
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map((author) =>
          author.id === updatedAuthor.id ? updatedAuthor : author
        )
        // doesn't have book count...
        return updatedAuthor
      } else {
        return null
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
