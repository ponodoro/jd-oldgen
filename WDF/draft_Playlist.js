/*
  -- draft_Playlist.js
 unfinished version of playlist.js because dengo didn't find time or brain cells to do it, yunyl smart
 - demgo
*/

const { GetSongDB } = require("./SongDB")

// Current playlist list.
const PlayLists = {
  2014: {
    
  },
  2015: {
    lastScreen: {
      
    },
    currentScreen: {
      
    },
    nextScreen: {
      
    }
  },
  2016: {
    
  },
  2017: {
    
  },
  2018: {
    
  }
};

const Times = {
  sessionToWorldResultTime: 30,
  display_next_song_time: 10,
  session_recap_time: 20,
  // change to 0 depending on the mode
  choice_duration: 15,
  result_duration: 15
}

const Screens = {
  
}

class Playlist {
  constructor(version = 2015) {
    
    this.version = version;
  
  }
  
  Get() {
    return PlayLists[this.version];
  }
  
  // Return all playlists.
  All() {
    return PlayLists;
  }
  
  // Switch screen from a game's playlist.
  SwitchScreen() {
    // Check if version is valid and a current Screen exists.
    if (PlayLists.hasOwnProperty(this.version) && Object.keys(PlayLists[this.version]["currentScreen"]).keys.length > 0) {
      
    }
    
    // If there's no playlist, make one!
    else {
      
      PlayLists[this.version]["currentScreen"]["type"] = "map";
      PlayLists[this.version]["currentScreen"]["mapName"] = "";
      PlayLists[this.version]["currentScreen"]["startTime"] = "";
      PlayLists[this.version]["currentScreen"]["endTime"] = "";
    
    }
  }
}

// Filter is used to filter out last played maps or next ones.
function GetRandomMap(version = 2015, amount = 1, filter = []) {
  
  amount = Number(amount);
  
  // Ignore if amount = 0;
  if (amount == NaN || amount <= 0) return;

  let gameSongDB = Object.keys(GetSongDB(version)["songs"]); // Game songdb.
  let newFilter = []; // Copy of filter.
  let randomMaps = []; // Maps to return.
  
  // Check what the filter is, whether it is is an array for multiple maps or only one.
  switch (Array.isArray(filter)) {
    case true:
      
      // Ignore if array is empty.
      if (filter.length == 0) return;
      
      // Pass the filter args to the copy.
      for (let i = 0; i < filter.length; i++) {
        newFilter.push(filter[i]);
      }
      
      // No duplicates if more than one map is requested. unfinished
      if (amount > 1) {
        
        // For each map needed, create a copy of the songdb, filter out the songs in randomMaps, and choose a new map.
        for (let i = 0; i < amount; i++) {
          // Copy of the songdb.
          let songDBcopy = gameSongDB.find(str => !newFilter.includes(str))
          
          // Choose a map.
          let chosenMap = songDBcopy[Math.floor(Math.random() * songDBcopy.length)];
          
          randomMaps.push(chosenMap);
          newFilter.push(chosenMap);
        }
        
        return randomMaps;
      } 
      
      else {
        // Copy of the songdb.
        let songDBcopy = gameSongDB.find(str => !newFilter.includes(str))
        
        // Choose a map.
        let chosenMap = songDBcopy[Math.floor(Math.random() * songDBcopy.length)];
        
        return chosenMap;
      }
      
      
    case false:
    default:
      
      // If you use object on this fucking function, I'll find you and break both of your legs, why would you ever???
      if (typeof filter === "string") {
        
        let songDBcopy = gameSongDB.filter(str => str !== filter)
        let randomMaps = songDBcopy[Math.floor(Math.random() * songDBcopy.length)];
        
        return randomMaps;
        
      }
      
      return;
  }
  
}

// Get Mode ID by the name of the mode. not sure if these are correct
function GetModeID(mode) {
  switch (mode.toLowerCase()) {
    case "selectcoach":
      return 3;
    case "vote":
      return 2;
    case "battle":
      return 1;
    default:
      return 0;
  }
}

module.exports = {
  GetRandomMap
};