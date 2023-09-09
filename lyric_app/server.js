
// 1)Importing Required Modules:
const axios = require("axios");
const express = require("express");
const { PORT } = require("./config");
//const db = require("./db");
//// Importing functions for fetching lyrics and song info from a library called "genius-lyrics-api"
const { getLyrics, getSong } = require("genius-lyrics-api");

// 2)Creating an Express Application
const app = express();

// 3) Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// 4) Data Storage Object to store contestant history
const constestantsHistory = {};

// 5) When a user accesses the root URL, the server responds with "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Future devlopment!! These will be used later to extract lyrics sections from the song
const lyric_type = ["Chorus", "Verse 1", "Verse 2"];


//Defining a Route for "/search"

app.get("/search", async (req, res) => {
    // Extract artist name and an API access token from the query parameters
  const client_search_artist_name = req.query.artist_name;   // artist_name=Kendrick%20Lamar
  const api_access_token = `4mVfNGG73R6XwToQnWIuJ2gf5Ds1iir3sUR6KeurUf19wsOxahHk6o17KRCAHYPo`;

  // Using the Axios library to make an HTTP GET request to the Genius API to search for the artist's name
  const results = await axios.get(
    `https://api.genius.com/search?access_token=${api_access_token}&q=${client_search_artist_name}`
  );




  //make an HTTP GET request to the Genius API with a search query for an artist's name.
  const username = req.query.username;

  const hit_song_title = results.data.response.hits[0].result.title;
  const artist_name = results.data.response.hits[0].result.primary_artist.name;


//FUTURE DEVELOPMENT Good to Haves
  if (!artist_name) {
    // TODO Error Handle by sending an error to the user notifiying them that they need a valid artist
  }

  if (!hit_song_title) {
    // TODO Error Handle by sending an error to the user notifiying them that API could not get a valid title
  }




// Create options for fetching lyrics
  const options = {
    apiKey: api_access_token,
    title: hit_song_title,
    artist: artist_name,
    optimizeQuery: true,
  };


  // Fetch lyrics using the "genius-lyrics-api" library
  const lyrics = await getLyrics(options);

  /*
     Use regular expressions to extract the sections

     1) Improve regex to work for other artists like Jay+Z
     2) Before using index on match regex confirm its defined
        e.g. when verse 3 doesn't exist for Kendrick+Lamar

  */

// Use regular expressions to extract song sections like Chorus, Verse 1, Verse 2
  
  let verse3 = undefined;
  const chorus = lyrics.match(/\[Chorus\]\n([\s\S]+?)\n\n/)[1].trim();
  const verse1 = lyrics.match(/\[Verse 1\]\n([\s\S]+?)\n\n/)[1].trim();
  const verse2 = lyrics.match(/\[Verse 2\]\n([\s\S]+?)\n?$/)[1].trim();

// Split and clean the verses
  const verseArray = verse1
    .split(/[.\n]/)
    .map((lineOfSong) => lineOfSong.replace(/[^a-zA-Z0-9 ]/g, ""));

  
// Randomly choose words to hide in the verse
  let randomIndexCount = 0;
  const randomIndexHistoryObj = {};
  const random_verse_index = Math.floor(Math.random() * verseArray.length);
  const full_lyric_sentence = verseArray[random_verse_index].split(" ");

// Randomly get 3 indexes, we will need to hide its word from the verse
  while (randomIndexCount < 3) {
    const randomIndex = Math.floor(Math.random() * full_lyric_sentence.length);

    if (randomIndexHistoryObj[randomIndex] !== true) {
      // New random index found lets add it to randomIndexHistoryObj
      randomIndexHistoryObj[randomIndex] = true;
      randomIndexCount++;
    }
  }

// Set user data in the contestantsHistory object
  const empty_user_data = {
    full_song_lyric: "",
    guess_song_lyric: [],
    user_submission: [],
    random_lyric_indexes: [],
    win_status: "",
    hit_song_title: "",
    artist_name: ""
  };
  constestantsHistory[username] = empty_user_data;

// Update Hit Song Title
  constestantsHistory[username].hit_song_title = hit_song_title;
  constestantsHistory[username].artist_name = artist_name;

// Insert a blank in replace of the hidden word
  for (randomIndex in randomIndexHistoryObj) {
    full_lyric_sentence[randomIndex] = "___";
    constestantsHistory[username].random_lyric_indexes.push(
      parseInt(randomIndex)
    );
  }

  constestantsHistory[username].full_song_lyric =
    verseArray[random_verse_index];
  constestantsHistory[username].guess_song_lyric = full_lyric_sentence;

  res.json(constestantsHistory[username]);
});

// Route for handling user submissions
app.post("/submit", async (req, res) => {
  const { word1, word2, word3 } = req.body;

  const username = req.query.username;

// Store user submissions in the contestant's history
  constestantsHistory[username].user_submission = [word1, word2, word3];

  for (let index = 0; index < 3; index++) {
    // Get the random lyric indexe so we can update the guess_song_lyric
    let random_word_index =
      constestantsHistory[username].random_lyric_indexes[index];
    constestantsHistory[username].guess_song_lyric[random_word_index] =
      constestantsHistory[username].user_submission[index];
  }


// Check if the user's guess matches the original song lyrics
  const user_submission_full_song_lyric =
    constestantsHistory[username].guess_song_lyric.join(" ");

  if (
    user_submission_full_song_lyric ===
    constestantsHistory[username].full_song_lyric
  ) {
    constestantsHistory[username].win_status = "you won";
  } else {
    constestantsHistory[username].win_status = "you lost";
  }

  res.json(constestantsHistory[username]);
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
