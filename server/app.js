'use strict';

var express = require('express');
var app = express();
var lex = require('letsencrypt-express');


var index = require('./routes/index');

app.use('/', index);
app.set("port", (process.env.PORT || 5000));

// app.listen(app.get("port"), function(){
//     console.log("Listening on port: " + app.get("port"));
// });

var results = lex.create({
  configDir: '/etc/letsencrypt'
, onRequest: app
, server: require('letsencrypt').productionServerUrl
}).listen(

  // you can give just the port, or expand out to the full options
  [80, { port: 8080, address: 'localhost', onListening: function () { console.log('http://localhost'); } }]

  // you can give just the port, or expand out to the full options
, [443, 5001, { port: 8443, address: 'localhost' }]

  // this is pretty much the default onListening handler
, function onListening() {
    var server = this;
    var protocol = ('requestCert' in server) ? 'https': 'http';
    console.log("Listening at " + protocol + '://localhost:' + this.address().port);
  }
);

// In case you need access to the raw servers (i.e. using websockets)
console.log(results.plainServers);
console.log(results.tlsServers);


module.exports = app;