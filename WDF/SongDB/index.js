/*
  -- GameIDs.js
 Lists and checks game IDs for JD Wii games.

 -- Made for old gen.
*/

const Logger = require.main.require("./Logger");

const SongDBs = {
  2014: require("./2014"),
  2015: require("./2015"),
  2016: require("./2016"),
  2017: require("./2017"),
  2018: require("./2018")
};

function GetMapObj(value, version) {
  
  let songDb = SongDBs[version];
  let result;

  try {
    switch (Number(value)) {
      case NaN:
      case "NaN":
        result = songDb.songs[value];
        break;
      default:
        result = songDb.songs[songDb.idtable[value]];
    }

    return result;
  } catch (error) {
    Logger.info(
      `SongDB.GetMapObj - ${value} for ${version} is not an available map, are we sure it's not missing?`
    );
    return null;
  }
  
}

function GetSongDB(version) {
  return SongDBs[version];
}

function IsMapAvailable(value, version = 2015) {
  
  let result = GetMapObj(value, version);

  if (result) return true;
  else {
    Logger.info(
      `SongDB.IsMapAvailable - ${value} for ${version} is not an available map, are we sure it's not missing?`
    );
    return false;
  }
  
}

function GetRandomMap(version = 2015) {
  
  let randomMapName = Object.keys(SongDBs[version].songs)[
    Math.floor(Math.random() * Object.keys(SongDBs[version].songs).length)
  ];
  
  return SongDBs[version].songs[randomMapName];
}


function CalculateEndBeat(musicTrackData) {
  let finalEndBeat =
    musicTrackData.markers[parseInt(musicTrackData.endBeat)] / 48;

  // Some maps endBeat does not have a marker so we have to get the latest beat's marker
  if (!finalEndBeat) {
    finalEndBeat =
      musicTrackData.markers[musicTrackData.markers.length - 1] / 48;
  }

  let finalStartBeat =
    musicTrackData.markers[parseInt(Math.abs(musicTrackData.startBeat))] / 48;
  
  return parseInt(finalEndBeat + finalStartBeat);
  
}

module.exports = {
  Main: SongDBs,
  GetSongDB,
  GetMapObj,
  IsMapAvailable,
  GetRandomMap,
  CalculateEndBeat
};
