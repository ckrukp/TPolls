const ClientModel = require('../db/models/Client')
const Constants = require('./config').constants
const crypto = require('crypto')

const UIDGenerator = require('uid-generator')
const tokenGen = new UIDGenerator(
  Constants.tokens.baseEncoding,
  Constants.tokens.length
)

const generateToken = async () => {
  try {
    const tokenValue = await tokenGen.generate()

    return tokenValue
  } catch (err) {
    console.error(err)
    return err
  }
}

const validateToken = (clientId, token) => {
  return new Promise((resolve, reject) => {
    ClientModel.findById(clientId, (err, res) => {
      if (err) reject(err)
      else {
        if (res && res.token === token) resolve(true)
        else resolve(false)
      }
    })
  })
}

const validatePassword = async (clientId, password, salt) => {
  return new Promise((resolve, reject) => {
    ClientModel.findById(clientId, (err, res) => {
      if (err) reject(err)
      else {
        if (res) {
          crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, key) => {
            if (err) reject(err)
            else resolve(res.hash === key.toString('hex'))
          })
        }
      }
    })
  })
}

const verifyTokenIsAdmin = token => {
  return new Promise((resolve, reject) => {
    ClientModel.find({ token: token }, (err, res) => {
      if (err) reject(err)
      else {
        if (res && res.length === 1 && res[0].dasAdmin) resolve(true)
        else resolve(false)
      }
    })
  })
}

const verifyClientIdIsAdmin = clientId => {
  return new Promise((resolve, reject) => {
    ClientModel.findById(clientId, (err, res) => {
      if (err) reject(err)
      else {
        if (res && res.dasAdmin) resolve(true)
        else resolve(false)
      }
    })
  })
}

module.exports.generateToken = generateToken
module.exports.validatePassword = validatePassword
module.exports.validateToken = validateToken
module.exports.verifyTokenIsAdmin = verifyTokenIsAdmin
module.exports.verifyClientIdIsAdmin = verifyClientIdIsAdmin

// module.exports = {
//   validateToken: validateToken,
//   generateToken: generateToken,
//   validatePassword: validatePassword,
//   verifyTokenIsAdmin: verifyTokenIsAdmin,
//   verifyClientIdIsAdmin: verifyClientIdIsAdmin
// }
