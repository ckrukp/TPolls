const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
  _id: String,
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

module.exports = (clientId, teamId) => mongoose.connection.useDb(clientId).model('Poll', PollSchema, teamId)
