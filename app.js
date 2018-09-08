
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var socket = require("socket.io");

var app = express();
var public = path.join(__dirname, 'public');
var pollModel = require('./models/pollModel');

app.use('/', express.static(public));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./routes/routing.js')(app,path,public);

var server = app.listen("3000",function() {
	console.log("Server lives at 3000");
});

var io = socket.listen(server);
require('./controller/pollController')(io,pollModel);