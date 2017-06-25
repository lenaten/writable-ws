#!/usr/bin/env node

var minimist = require('minimist')
var WritableWS = require('..')

var argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    l: 'host',
    p: 'port',
    v: 'version'
  },
  boolean: [
    'help'
  ],
  string: [
    'host'
  ],
  default: {
    host: '0.0.0.0',
    port: 9999
  }
})

if (argv.version) {
  console.log(require('../package.json').version)
  process.exit(0)
}

if (argv.help) {
  console.log(function () {
  /*
  writable-ws - Pipe input to websocket
  Usage:
    writable-ws [OPTIONS]
  Options:
    -l  --host [string]           change the listen host [default: '0.0.0.0']
    -p, --port [number]           change the port [default: 9999]
    -v, --version                 print the current version
  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

const options = {
  host: argv.host,
  port: argv.port
}
const writableWS = new WritableWS(options)
process.stdin.pipe(writableWS)
