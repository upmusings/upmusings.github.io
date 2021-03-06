const Indental = require('./build/lib/indental')
const Builder = require('./build/builder')
const Manager = require('./build/manager')
const Database = require('./build/db')
const Log = require('./build/log')

const home = require('os').homedir()
const logs = new Log(`${home}/log.json`)
const db = new Database('./db')

String.prototype.toCap = function () {
  return this[0].toUpperCase() + this.slice(1).toLowerCase()
}

String.prototype.toUrl = function () {
  return this.replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase()
}

let data = ''
for (let key in db.store) data += db.store[key]

const {pages} = new Manager(new Indental(data).parse(), logs)

new Builder(pages).build()
