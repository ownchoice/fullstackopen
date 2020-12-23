const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const config = require('./utils/config')
const book = require('./models/book')

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
    allBooks: async (root, args) => {
      let booksToReturn = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
      })
      if (args.author) {
        booksToReturn = booksToReturn.filter(
          (book) => book.author.name === args.author
        )
      }
      if (args.genre) {
        booksToReturn = booksToReturn.filter((book) =>
          book.genres.includes(args.genre)
        )
      }

      // if (args.author) {
      //   console.log(booksToReturn)
      //   booksToReturn = booksToReturn.find({
      //     author: { name: { $eq: args.author } },
      //   })
      // }
      // if (args.genre) {
      //   booksToReturn = booksToReturn.find({ genres: { $in: [args.genre] } })
      // }
      // console.log('booksToReturn ', booksToReturn.length)
      return booksToReturn
    },
    allAuthors: async () => {
      let authors = await Author.find({})
      authors = authors.map((author) => author.toObject({ virtuals: false }))
      // authors.forEach((author) => console.log(author))
      // todo
      // const dos = authors.map()
      // const bookCount = await Book.find({ author: { $eq: } })
      // console.log(authors)

      // I would very much prefer to not have to get all the blogs... unnecessary network traffic?
      const books = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
      })
      authors = authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author.name === author.name
        ).length
        return { ...author, bookCount: bookCount }
      })
      console.log(authors)
      return authors
    },
  },
  Mutation: {
    addAuthor: (root, args) => {
      if (!args.name) {
        throw new UserInputError('Name must be provided', {
          invalidArgs: args.name,
        })
      }
      // const authorFound = await Author.findOne({ name: args.name })
      // if (!authorFound) {
      //   throw new UserInputError('Author already exists', {
      //     invalidArgs: args.name,
      //   })
      // }
      const newAuthor = new Author({ ...args })
      return newAuthor.save()
    },
    addBook: async (root, args) => {
      let { author: authorName, ...book } = args
      const authorFound = await Author.findOne({ name: authorName })
      if (!authorFound) {
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

      // shouldn't have to find it! I already have it... but I don't know how to populate it
      const finalBook = await Book.findById(savedBook.id).populate('author', {
        name: 1,
        born: 1,
      })
      // console.log(finalBook)
      return finalBook
    },
    editAuthor: async (root, args) => {
      const updatedBlog = Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        {
          new: true,
          runValidators: true,
          context: 'query',
        }
      )
      // const updatedBlog = await Blog.findByIdAndUpdate(
      //   request.params.id,
      //   blog,
      //   {
      //     new: true,
      //     runValidators: true,
      //     context: 'query',
      //   }
      // ).populate('user', { username: 1, name: 1 })

      // if (author) {
      //   const updatedAuthor = { ...author, born: args.setBornTo }
      //   authors = authors.map((author) =>
      //     author.id === updatedAuthor.id ? updatedAuthor : author
      //   )
      //   // doesn't have book count...
      //   return updatedAuthor
      // } else {
      //   return null
      // }

      return updatedBlog
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
