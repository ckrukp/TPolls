const checkContent = req => {
  return req.is('application/json')
}

module.exports.checkContent = checkContent
