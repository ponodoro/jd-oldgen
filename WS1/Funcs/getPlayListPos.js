const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users");
const SongDB = require.main.require("./WDF/SongDB");
const Playlist = require.main.require("./WDF/Playlist");

function ParseEpoch(epoch) {
  return (Number(epoch) / 1000).toString().substring(1);
}

module.exports = (req, res, next) => {
  
  const Screens = new Playlist(2015)
  
  const previousScreen = Screens.GetScreen().previousScreen,
        currentScreen = Screens.GetScreen().currentScreen,
        nextScreen = Screens.GetScreen().nextScreen
  
  const start = currentScreen.start,
        end = currentScreen.end,
        sessionToWorldResultTime = currentScreen.mode.times.sessionToWorldResultTime,
        display_next_song_time = currentScreen.mode.times.display_next_song_time,
        session_recap_time = currentScreen.mode.times.session_recap_time,
        theme_choice_duration = currentScreen.mode.times.theme_choice_duration,
        theme_result_duration = currentScreen.mode.times.theme_result_duration,
        coach_choice_duration = currentScreen.mode.times.coach_choice_duration,
        coach_result_duration = currentScreen.mode.times.coach_result_duration
  
  let response = {
    mode: currentScreen.mode.id,
    nextmode: nextScreen.mode.id,
    start: ParseEpoch(start),
    end: ParseEpoch(end),
    unique_song_id: currentScreen.map.songId,
    sessionToWorldResultTime,
    display_next_song_time,
    session_recap_time,
    theme_choice_duration,
    theme_result_duration,
    coach_choice_duration,
    coach_result_duration,
    vote1: 0,
    vote2: 0,
    vote3: 0,
    vote4: 0,
    votenumresult: 0,
    vote1_song: 0,
    vote2_song: 0,
    vote3_song: 0,
    vote4_song: 0,
    rankwait: 2,
    nextsong: nextScreen.map.songId,
    votenumchoices: 0,
    vote_end: ParseEpoch(end- 49999),
    requestPlaylistTime: ParseEpoch(nextScreen.start), // next time to request playlistpos
    pos: Date.now() - Number(start), // Current position of the song playing.
    next4: 0,
    next3: 0,
    next2: 0,
    next1: 0,
    left: Number(end) - Date.now(), // Amount of time left until the song's end.
    interlude: "yes",
    count: new Users().Count(),
    t: ParseEpoch(Date.now())
  };

  switch (currentScreen.type) {
    case "map":
      break;
    case "recap":
      break;
  }

  return response;
};
