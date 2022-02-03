let Config = {
  ws1: {
    Constants: {
      IntervalOfSendScore: 5,
      IntervalOfRemovingDeadUsers: 60
    },
    Lobby: {
      MaxLobbyPlayers: 8
    },
    Playlist: {
      WorldRankingScreenTime: 30,
      PartyRecapScreenTime: 20
    }
  },
  ws2: {
    JDWall: {
      RefreshTime: 120,
      MaximumMessages: 5
    }
  },
  db: {
    connectToMongoDB: false
  }
};

module.exports = Config;
