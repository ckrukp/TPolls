module.exports = server => {
  require('./polls')(server)
  // require('./auth')(server)
  require('./teams')(server)
}
