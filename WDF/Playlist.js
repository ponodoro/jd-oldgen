/*
  -- Playlist.js
 Can generate playlists to use on the WDF.

 -- Primarily made for Old-Gen (and New-Gen?).
*/
const SongDB = require("./SongDB");
const Scoreboard = require("./Scoreboard");

let Playlists = {
  2015: {
    previousScreen: {},
    currentScreen: {},
    nextScreen: {},
    previousMap: ""
  }
};

const Modes = {
  theme: {
    id: 1,
    times: {
      sessionToWorldResultTime: 30,
      display_next_song_time: 10,
      session_recap_time: 20,
      theme_choice_duration: 15,
      theme_result_duration: 15,
      coach_choice_duration: 0,
      coach_result_duration: 0,
    },
    extra_times: []
  },
  vote: {
    id: 2,
    times: {
      sessionToWorldResultTime: 30,
      display_next_song_time: 10,
      session_recap_time: 20,
      theme_choice_duration: 0,
      theme_result_duration: 0,
      coach_choice_duration: 0,
      coach_result_duration: 0,
    },
    extra_times: []
  },
  coach: {
    id: 3,
    times: {
      sessionToWorldResultTime: 30,
      display_next_song_time: 0,
      session_recap_time: 20,
      theme_choice_duration: 0,
      theme_result_duration: 0,
      coach_choice_duration: 0,
      coach_result_duration: 0,
    },
    extra_times: [
      
    ]
  }
};

// Mode to force Playlist to use.
const ForcedMode = "coach";


function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function combineTimes(a) {
  // If given value is an object, combine it's values to an array.
  if (typeof a === 'object' && a !== null) a = Object.values(a)
  return a.reduce((a, b) => (a+b), 0) * 1000
}


class Playlist {
  constructor(version) {
    this.version = version;
    this.playlist = Playlists[version];
  }
  
  All() {
    return Playlists
  }

  // Get's the current screen, if current screen has ended
  // Updates previousScreen to currentScreen
  // and currentScreen to nextScreen.
  GetScreen() {
    
    let previousScreen = this.playlist.previousScreen;
    let currentScreen = this.playlist.currentScreen;
    let nextScreen = this.playlist.nextScreen;

    this.CreateScreen();
    
    // Current screen has ended, update it and move everything.
    if (Date.now() > currentScreen.end) {
      console.log("current screen ended!");
      console.log("cleaning scoreboard")
      new Scoreboard().ClearScores()
      this.playlist.previousScreen = this.playlist.currentScreen;
      this.playlist.currentScreen = this.playlist.nextScreen;
      this.playlist.nextScreen = {};
      this.CreateScreen();
    }
    
    return this.playlist
    
  }

  // Able to create screens
  CreateScreen() {

    let previousScreen = this.playlist.previousScreen;
    let currentScreen = this.playlist.currentScreen;
    let nextScreen = this.playlist.nextScreen;

    // Returns map screen object with a random map assigned.
    function CreateMapScreen(version) {
      
      let currentMode = Modes[ForcedMode] 
      let map = SongDB.GetRandomMap(version);
      
      // // If current mode is select a coach, we set coach_choice_duration and coach_result_duration
      // // times by currentMap's coachCount
      // if (currentMode.id === 3) {
      //   if (map.numCoach > 1) {
      //     currentMode.times.coach_choice_duration = 15
      //     currentMode.times.coach_result_duration = 15
      //   } else {
      //     currentMode.times.coach_choice_duration = 0
      //     currentMode.times.coach_result_duration = 0
      //   }
        
      // }

      return {
        type: "map",
        mode: currentMode,
        map,
        start: Date.now(),
        end: Date.now() + SongDB.CalculateEndBeat(map.musicTrackData)
      }
    }

    
    // If currentScreen does not exist, create a map screen for it.
    if (isObjEmpty(this.playlist.currentScreen)) {
      console.log("current screens empty, creating it");
      this.playlist.currentScreen = CreateMapScreen(this.version);
    }

    
    // If next screen is empty, create a screen depending on type of current screen.
    // If current screen is recap, it will create a map, if it's map, it will create a recap.
    if (isObjEmpty(this.playlist.nextScreen)) {
      console.log("next screens empty, creating it");
      switch (this.playlist.currentScreen.type.toLowerCase()) {
        case "map":
          
          this.playlist.nextScreen = CreateMapScreen(this.version, true);
          
          previousScreen = this.playlist.previousScreen;
          currentScreen = this.playlist.currentScreen;
          nextScreen = this.playlist.nextScreen;

          // For the next map that is about to play, we need to add the time between 2 maps
          // Basically we add the length of recap screens.
          nextScreen.start = currentScreen.end + combineTimes(nextScreen.mode.times) + combineTimes(nextScreen.mode.extra_times)
          nextScreen.end = nextScreen.start + SongDB.CalculateEndBeat(nextScreen.map.musicTrackData)
          break;
      }
    }

    return;
  }
}

module.exports = Playlist;