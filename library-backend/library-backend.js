const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
// const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const loaders = require('./loaders')

const JWT_SECRET = config.SECRET

console.log('connecting to', config.MONGODB_URI)

mongoose.set('debug', true)

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
    me: User
    allUsers: [User!]!
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
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
    authorAdded: Author!
    userAdded: User!
  }
`

const resolvers = {
  Author: {
    bookCount: async (root, args, context) => {
      // let author = await Author.findOne({ name: root.name })
      // console.log('Author.findOne({ name: root.name })')
      // const books = await Book.find({}).populate('author', {
      //   name: 1,
      //   born: 1,
      // })
      // console.log('Book.find({})')
      // const bookCount = books.filter((book) => book.author.name === author.name)
      //   .length
      // return bookCount
      return context.loaders.bookCountLoader.load(root.name)
    },
  },
  Query: {
    bookCount: () => Book.count(),
    authorCount: () => Author.count(),
    allBooks: async (root, args) => {
      let booksToReturn = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
      })

      // #TODO Maybe here I could manually add the bookCount property to the author to avoid a second query

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
      return booksToReturn
    },
    allAuthors: async () => {
      let authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allUsers: (root, args, context) => {
      const users = User.find({})
      return users
    },
  },
  Mutation: {
    addAuthor: (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('must be logged in')
      }
      try {
        if (!args.name) {
          throw new UserInputError('Name must be provided', {
            invalidArgs: args.name,
          })
        }
        const newAuthor = new Author({ ...args })

        const savedAuthor = newAuthor.save()
        pubsub.publish('AUTHOR_ADDED', { authorAdded: savedAuthor })
        return savedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('must be logged in')
      }
      if (args.title.length < 2) {
        throw new UserInputError(
          'book title must be at least 2 characters long'
        )
      }
      try {
        let { author: authorName, ...book } = args
        const authorFound = await Author.findOne({ name: authorName })
        if (!authorFound) {
          const newAuthor = new Author({ name: authorName })
          const savedAuthor = await newAuthor.save()
          book.author = savedAuthor.id
          pubsub.publish('AUTHOR_ADDED', { authorAdded: savedAuthor })
        } else {
          book.author = authorFound.id
        }
        let newBook = new Book({ ...book })
        let savedBook = await newBook.save()

        // shouldn't have to find it! I already have it... but I don't know how to populate it
        const finalBook = await Book.findById(savedBook.id).populate('author', {
          name: 1,
          born: 1,
        })
        // console.log(finalBook)

        pubsub.publish('BOOK_ADDED', { bookAdded: finalBook })

        return finalBook
      } catch (error) {
        console.log('caught', error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('must be logged in')
      }
      try {
        const updatedBlog = Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          {
            new: true,
            runValidators: true,
            context: 'query',
          }
        )
        return updatedBlog
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        if (!args.favoriteGenre) {
          throw new UserInputError('favoriteGenre must be provided', {
            invalidArgs: 'favoriteGenre',
          })
        }

        const savedUser = user.save()
        pubsub.publish('USER_ADDED', { userAdded: savedUser })
        return savedUser
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'unsecurePassword') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
        // favoriteGenre: user.favoriteGenre,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_ADDED']),
    },
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser, loaders }
    } else {
      return { loaders }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
