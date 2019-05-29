const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
  _id: String, // The id of the member, also their user id on Discord.
  teamId: String, // The id of the team this user is a member of.
  displayName: { // The members username/nickname.
    type: String,
    required: false,
    trim: true
  },
  voteCount: Number // The amount of times the member has cast a vote.
})

MemberSchema.plugin(mongooseStringQuery)
MemberSchema.plugin(timestamps)

module.exports = mongoose.connection.model('Member', MemberSchema, 'Members')
