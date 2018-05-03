'use strict'

const Hapi = require('hapi')
const Bunyan = require('bunyan')
const Good = require('good')
const Healthy = require('hapi-and-healthy')
const Inert = require('inert')
const Auth = require('hapi-auth-basic')
const Self = require('../../package')
const Env = process.env.NODE_ENV || 'DEV'
const Port = process.env.PORT || 5000
const OS = require('os')
const host = OS.hostname()

const Logger = Bunyan.createLogger({ name: 'weidmann.design', level: 'info' })

const server = Hapi.server({
  host: '0.0.0.0',
  port: Port
})

const options = {
  reporters: {
    bunyan: [{
      module: 'good-bunyan',
      args: [
        { ops: '*', response: '*', log: '*', error: '*', request: '*' },
        {
          logger: Logger,
          levels: {
            ops: 'debug'
          },
          formatters: {
            response: (data) => {
              return 'Response for ' + data.path
            }
          }
        }
      ]
    }]
  }
}

const validate = async (request, username, password, h) => {
  if (username === 'speaker' && password === 'Speaker Notes are cute *.*') {
    return { credentials: {id: 'speaker', name: 'Speaker'}, isValid: true }
  } else {
    return { credentials: {}, isValid: false }
  }
}

const rest = async () => {
  server.route({
    method: 'GET',
    path: '/api/hello',
    handler: function (request, h) {
      return 'hello world'
    }
  })

  // server.route({
  //   method: 'GET',
  //   path: '/api/pipelines',
  //   handler: function (request, h) {
  //     const detailedRaw = request.query.detailed
  //     const detailed = `${detailedRaw}`.toLowerCase() === 'true'

  //     const limitRaw = request.query.limit
  //     const limit = Number.parseInt(limitRaw)

  //     return Gitlab.pipelines(detailed, limit)
  //   }
  // })

  // server.route({
  //   method: 'GET',
  //   path: '/api/deployments',
  //   handler: function (request, h) {
  //     return Gitlab.deployments()
  //   }
  // })
}

const files = async () => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'static',
        index: ['index.html']
      }
    }
  })
}

async function start () {
  try {
    await server.register(Auth)
    server.auth.strategy('simple', 'basic', { validate: validate, allowEmptyUsername: true, default: false })

    await rest()

    await server.register(Inert)
    await server.register({
      plugin: Good,
      options: options
    })

    await files()

    await server.register({
      plugin: Healthy,
      options: {
        path: '/api/health',
        id: host,
        env: Env,
        name: Self.name,
        version: Self.version
      }
    })

    await server.start()
  } catch (err) {
    server.log('error', err)
    process.exit(1)
  }

  server.log('info', {host: host})
  server.log('info', {uri: server.info.uri})
  server.log('info', {name: Self.name})
  server.log('info', {version: Self.version})
};

start()
