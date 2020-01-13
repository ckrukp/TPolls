const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
  _id: String,
  username: String,
  hash: String,
  salt: String,
  token: String,
  dasAdmin: {
    type: Boolean,
    required: false,
    default: false
  }
})

ClientSchema.plugin(timestamps)

module.exports = mongoose.connection.useDb('tpConfig').model('Client', ClientSchema, 'Clients')
