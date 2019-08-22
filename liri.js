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

initialize()

