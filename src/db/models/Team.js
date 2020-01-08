const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema({
  clientId: String, // The id of the client who created the team.
  displayName: { // The name of the team to use for display purposes.
    type: String,
    required: false,
    trim: true
  },
  members: [{ // An array of member objects for each member of the team.
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

module.exports = () => mongoose.connection.useDb('tpConfig').model('Team', TeamSchema, 'Teams')
