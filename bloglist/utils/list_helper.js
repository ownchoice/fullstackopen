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


const mostLikes = (blogs) => {
  const authorsList = blogs.reduce((accumulator, currentBlog) => {
    const foundAuthor = accumulator.find(item => item.author === currentBlog.author)
    if (foundAuthor) {
      foundAuthor.likes += currentBlog.likes
    } else {
      accumulator = accumulator.concat({ author: currentBlog.author, likes: currentBlog.likes })
    }
    return accumulator
  }, [])

  const mostLiked = authorsList.reduce((accumulator, currentValue) => {
    return currentValue.likes > accumulator.likes? currentValue: accumulator
  })

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}