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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}