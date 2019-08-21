require("dotenv").config();
let inquire = require('inquirer')
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");
var PokemonNode = require('pokemon-node');
var Pokemon = require("./pokemon-obj.js");
let axios = require('axios')
if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
};

var spotify = new Spotify ({
  id: "fa1cd9bad9d44815a112ef2537fb68d3",
  secret: "34219f4e552e45c7808b41e550291810"
})

var getArtistNames = function (artist) {
  return artist.name;
};

let initialize = () =>{
  inquire
  .prompt({
    type: "list",
    name: "choice",
    message: "Welcome to LIRI what would you like to do?",
    choices:["Spotify","Pokemon","OMDB","do it"]
  }
  ).then(reply=>{
    console.log("you've chosen "+reply.choice)
    if(reply.choice === "Pokemon"){
      pokemonThis()
    }else if(reply.choice === "OMDB"){
      getMeMovie()
    }else if(reply.choice === "do it"){
      doWhatItSays()
    }else{
      getMeSpotify()
    }
  })
}

var getMeSpotify = function () {
  inquire
  .prompt({
    type: "input",
    message: "type in song to search for",
    name: "song"
  }).then(res =>{

  spotify.search({ type: 'track', query: res.song || 'dancing in the moonlight' }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
console.log(data.tracks.items[0])
setTimeout(initialize,2000)
    // var songs = data.tracks.items;
    // for (var i = 0; i < songs.length; i++) {
    //   console.log(i);
    //   console.log("artist(s): " + songs[i].artists.map(
    //     getArtistNames));
    //   console.log("song name: " + songs[i].name);
    //   console.log("preview song: " + songs[i].preview_url);
    //   console.log("album: " + songs[i].album.name);
    //   console.log("-----------------------------------");
    // }
  });
  })
  
}

var getMeMovie = function () {
  inquire
  .prompt({
    type: "input",
    message: "What movie would you like to search for?",
    name: "movie"
  }).then(res =>{
    axios.get("http://www.omdbapi.com/?apikey=f4fa1132&s=" + res.movie + "&y=&plot=short&r=json").then(function (response) {
    if (response) {
      console.log(response.data.Search[0])
      // var jsonData = JSON.parse(body);
      // console.log("Title: " + jsonData.Title);
      // console.log("Year: " + jsonData.Year);
      // console.log("Rated: " + jsonData.Rated);
      // console.log("IMDB Rating: " + jsonData.imdbRating);
      // console.log("Country: " + jsonData.Country);
      // console.log("Language: " + jsonData.Language);
      // console.log("Plot: " + jsonData.Plot);
      // console.log("Actors: " + jsonData.Actors);
      // console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
      // console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
    }
    setTimeout(initialize,2000)
  }).catch(err=>console.log(err))
  ;
  })
  



}

var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);
  });
};

// var pick = function (caseData, functionData) {
//   // Determines the action selected...
//   // Based on the operand we run the appropriate math on the two numbers
//   switch (caseData) {
//     case "pokemon-this":
//       var pokemon = input1;
//       if (!pokemon || !pokemon.trim()) {
//         return console.log("You must provide a pokemon name to search.")
//       }
//       pokemonThis(pokemon.trim().toLowerCase());
//       break;

//     case "spotify-this-song":
//       getMeSpotify(functionData);
//       break;
//     case "movie-this":
//       getMeMovie(functionData);
//       break;
//     case "do-what-it-says":
//       doWhatItSays();
//       break;
//     default:
//       console.log("Sorry LIRI not SIRI");
//   }
// };

function pokemonThis() {
  inquire
  .prompt({
    type:"input",
    message:"What Pokemon would you like to search for?",
    name:"pokemon"
  }).then(res=>{
    PokemonNode.getPokemon(res.pokemon)
    .then(function (poke) {
      var result = new Pokemon(poke);
      result.display();
      setTimeout(initialize, 2000)
    })
    .catch(function (err) {
      if (err.includes("404")) {
        console.log("I'm sorry that pokemon is not found.");
      } else {
        console.log("There was a server error.")
      }
    })
  })
}

  // Function which takes in command line arguments and executes correct function accordingly
initialize()

