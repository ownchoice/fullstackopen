const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
  },
  author: String,
  url: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      body: {
        type: String,
        minlength: 5,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject._id !== undefined) {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
    delete returnedObject.__v
    if (returnedObject.comments !== undefined) {
      returnedObject.comments.forEach((comment) => {
        comment.id = comment._id.toString()
        delete comment._id
      })
    }
  },
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)
