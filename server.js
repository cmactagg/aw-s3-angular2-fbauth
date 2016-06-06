'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var fallback = require('express-history-api-fallback');
var userProfileRoute = require('./routes/user-profile.route')();

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//find static web files here
var root = __dirname + '/'
app.use(express.static(root));


app.use(userProfileRoute.rootRoutePath, userProfileRoute);


app.use(fallback('index.html', { root: root }));

var server = require('http').createServer(app);


module.exports = app;
const API_PORT = process.env.PORT || 3000;
server.listen(API_PORT, function () {
  console.log('API server listening on port ' + API_PORT);
});