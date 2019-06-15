const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema({
  _id: String, // The id of the team, also the id of the server on Discord.
  displayName: { // The name of the team to use for display purposes.
    type: String,
    required: false,
    trim: true
  },
  members: [{ // An array of member objects for each member of the team.
    _id: String, // The id of the member, also their user id on Discord.
    displayName: { // The members username/nickname.
      type: String,
      required: false,
      trim: true
    },
    voteCount: Number // The amount of times the member has cast a vote.
  }]
})

TeamSchema.plugin(mongooseStringQuery)
TeamSchema.plugin(timestamps)

module.exports = clientId => mongoose.connection.useDb(clientId).model('Team', TeamSchema, 'TeamsData')
