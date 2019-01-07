var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')
const config = require('../config')
var app = express()

// Use the default path '/' (Not recommended)
// app.use(mockjs(path.join(__dirname, 'mocks')))

// Use a custom path '/api'
app.use('/api', mockjs(path.join(__dirname, './api')))

module.exports = app.listen(config.mock.port, function (err) {
  if (err) {
    console.log(err)
    return;
  }
  var uri = 'http://localhost:' + config.mock.port || 3000
  console.log('Mock Server Listen at ' + uri + '\n')
})
