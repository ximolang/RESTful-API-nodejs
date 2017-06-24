const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ListSchema = new Schema({
  title: String,
  content: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('List', ListSchema)

