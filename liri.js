//using .env to hide keys
require("dotenv").config();

var keys = require('./keys');
var twitterCredentials = keys.twitterKeys;

var command = process.argv[2];
var query = process.argv[3];