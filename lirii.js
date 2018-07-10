//using .env to hide 
require("dotenv").config();

// calling npm install files

var keys = require('./keys');
var twitterCredentials = keys.twitterKeys;
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');

var searchTerm = '';
for(var i = 3; i < process.argv.length; i++){
    searchTerm += " " + process.argv[i];
}

console.log("This is our Search Term: " + searchTerm)

var command = process.argv[2];
// var query = process.argv[3];

var query = searchTerm;



var bacon = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

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

var spotifyThisSong = function(trackQuery){

if (trackQuery === undefined){
    trackQuery = "let it go";

}

// Spotify API request (if an object is returned, output the first search result's artist(s), song, preview link, and album)
bacon.search({ type: 'track', query: trackQuery }, function(error, data) {
    if(error) { // if error
        console.log('Error occurred: ' + error);
    } else { // if no error
        // For loop is for when a track has multiple artists

        
        console.log("Song: ", data.tracks.items[0].name);
        console.log("Artist: ", data.tracks.items[0].album.artists[0].name)
        console.log("Album: ", data.tracks.items[0].album.name)
        console.log("Preview URL: ", data.tracks.items[0].album.artists[0].external_urls.spotify)

            
    }
 
         
});
}
// movie function 
function movieFinder(){
    var movie = process.argv[3];
    if(!movie){
        movie = "frozen";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            var movieResults =
            "Title: " + movieObject.Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
            "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
            
            console.log(movieResults);
            log(movieResults); // calling log function
        } else {
            console.log("Error :"+ error);
            return;
        }
    });
};




//  do what it says function, reads and write module, access random.txt
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(!error){
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else{
            console.log("Error occurred" + error);
        }
    })
}
// what the user will use to call the commands
if(command === "my-tweets"){
    myTweets();
}
else if (command === "spotify-this-song"){
    spotifyThisSong(query);
}
else if (command === "movie-this") {
        movieFinder();
}
else if(command === "do-what-it-says"){
    doWhatItSays();
}

