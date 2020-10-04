// const lodash = require('lodash')
// const array = require('lodash/array')

const dummy = (blogs) => {
  return 1
}

const reducer = (accumulator, currentValue) => {
  return accumulator + currentValue.likes
}

const totalLikes = (blogs) => {
  return blogs.length === 0? 0: blogs.reduce(reducer, 0)
}

const getMostPopular = (accumulator, currentValue) => {
  return accumulator.likes > currentValue.likes? accumulator: currentValue
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0? 0: blogs.reduce(getMostPopular, 0)
}

const authorsReducer = (accumulator, currentBlog) => {
  const foundAuthor = accumulator.find(item => item.author === currentBlog.author)
  if (foundAuthor) {
    foundAuthor.blogs += 1
  } else {
    accumulator = accumulator.concat({ author: currentBlog.author, blogs: 1})
  }
  return accumulator
}


const mostBlogs = (blogs) => {
  const authorsList = blogs.reduce(authorsReducer, [])
  return authorsList.reduce((accumulator, currentValue) => {
    return currentValue.blogs > accumulator.blogs? currentValue: accumulator
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}