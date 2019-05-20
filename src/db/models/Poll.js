const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const PollSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: false,
    trim: true
  },
  question: {
    title: String,
    description: String
  },
  responses: [{
    content: String,
    count: Number
  }]
})
PollSchema.plugin(mongooseStringQuery)
PollSchema.plugin(timestamps)

module.exports = collection => mongoose.connection.model('Poll', PollSchema, collection)
