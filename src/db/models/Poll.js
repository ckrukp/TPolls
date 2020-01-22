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
    _id: {
      type: String,
      required: true
    },
    content: String,
    count: Number
  }]
})

PollSchema.plugin(timestamps)

module.exports = (clientId, teamId) => mongoose.connection.useDb(clientId).model('Poll', PollSchema, teamId)
