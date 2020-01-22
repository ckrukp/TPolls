const config = require('./src/util/config')
const pkg = require('./package.json')

module.exports = {
  apps: [{
    name: pkg.displayName,
    script: pkg.main,
    watch: false,
    env: {
      PORT: 4242,
      VERSION: config.version,
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 4200,
      VERSION: config.version,
      NODE_ENV: 'production'
    }
  }]
}
