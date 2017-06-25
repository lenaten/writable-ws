const debug = require('debug')('writable-ws')
const Writable = require('stream').Writable
const WebSocketServer = require('uws').Server
const fs = require('fs')

class WritableWS extends Writable {
  constructor (options) {
    super(options)

    options = options || {}

    this.host = options.host || '0.0.0.0'
    this.port = options.port || 9999

    this.server = new WebSocketServer({ host: this.host, port: this.port }, this._onServerOpen.bind(this))
    this.server.on('connection', this._onServerConnection.bind(this))
  }

  _onServerOpen () {
    debug('listen on %s:%s', this.host, this.port)
  }

  _onServerConnection (socket) {
    debug('on server connection')
    this.socket = socket
    this.socket.on('close', this._onSocketClose.bind(this))
  }

  _onSocketClose () {
    debug('on socket close')
    this.socket = null
  }

  _write (chunk, encoding, callback) {
    debug('write filename %s', chunk)
    const buffer = fs.readFileSync(chunk)
    if (buffer && this.socket) {
      this.socket.send(buffer, { binary: true })
    }
    callback()
  }
}

module.exports = WritableWS
