const express = require('express');
//const path = require('path');
//const PORT = process.env.PORT || 5000;
var controller1 = require('./controllers/controller1');
var xsvr = express();

//set up template engine
xsvr.set('view engine', 'ejs');

//static files
xsvr.use( express.static('./') ); //no specific route specified... thus, all requests routed to ./ (root app.js level)

//fire controllers (ie. call functions)
controller1( xsvr ); //passing it the express server

//listen to port
xsvr.listen(3000);
//xsvr.listen(PORT, () => console.log(`Listening on ${ PORT }`))
console.log(__dirname.slice(-5) + ' xsvr listening on 3000');