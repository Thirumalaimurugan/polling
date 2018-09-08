
var express = require('express');
var path = require('path');
var socket = require("socket.io");

var app = express();
var public = path.join(__dirname, 'public');
var pollModel = require('./models/pollModel');

app.use('/', express.static(public));

require('./routes/routing.js')(app,path,public);

var server = app.listen("3000",function() {
	console.log("Server lives at 3000");
});

var io = socket.listen(server);
require('./controller/pollController')(io,pollModel);