//using .env to hide 
// require("dotenv").config();

var keys = require('./keys');
var twitterCredentials = keys.twitterKeys;

var command = process.argv[2];
var query = process.argv[3];

// function for 3 main functions of the liri app

var myTweets = function() {
    // load twiter from npm
    var twitter = require('twitter');
    
    // export keys.js file
    var client = new twitter({
        consumer_key: twitterCredentials.consumer_key,
        consumer_secret: twitterCredentials.consumer_secret,
        access_token_key: twitterCredentials.access_token_key,
        access_token_secret: twitterCredentials.access_token_secret

    });


  // Twitter API parameters
    var params = {
        screen_name: 'mvmai11',
        count: 20
    };

    // GET request for last 20 tweets on my account's timeline
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(error) { // if there IS an error
            console.log('Error occurred: ' + error);
        } else { // if there is NO error
        console.log("My 20 Most Recent Tweets");
        console.log("");

        for(var i = 0; i < tweets.length; i++) {
            console.log("( #" + (i + 1) + " )  " + tweets[i].text);
            console.log("Created:  " + tweets[i].created_at);
            console.log("");
        }
      }
    });
}

// what the user will use to call the commands
if(command === "my-tweets"){
    myTweets();
}