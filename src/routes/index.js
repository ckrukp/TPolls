module.exports = server => {
  // The only public routes.
  require('./polls')(server)

  // Private routes to be used by admins only.
  require('./teams')(server)
  require('./clients')(server)
}
