/*
  -- Lobby.js
 Can generate and assign lobbies for WDF players.

 -- Primarily made for Old-Gen.
*/
const Logger = require.main.require("./Logger");
const Config = require.main.require("./Config").ws1.Lobby;

const Lobbies = [];

class Lobby {
  constructor(version = 2015) {
    
    this.version = version;
    
  }
  
  All() {
    return Lobbies
  }

  CreateLobby() {
    
    let LobbyObj = {
      version: this.version,
      players: [],
      playerCount: 0,
      id: Math.floor(100000000 + Math.random() * 900000000)
    };
    Logger.info(
      `Lobby.CreateLobby - Created a lobby with ID ${LobbyObj.id} for ${this.version}`
    );

    Lobbies.push(LobbyObj);
    return [LobbyObj];
    
  }

  FindAvailableLobby() {
    
    // If lobby's version equals to requested version
    // and if the player count is not 8
    return Lobbies.filter(lobby => {
      return (
        lobby.version == this.version && lobby.playerCount < Config.MaxLobbyPlayers
      );
    });
    
  }
  
  FindLobbyBySID(sid) {
    
    // Find lobby of sid
    return Lobbies.filter(lobby => {
      return lobby.version == this.version && lobby.players.includes(sid);
    });
    
  }

  JoinLobby(sid) {
    
    Logger.info(`Lobby.JoinLobby - ${sid} Looking for available lobbies to join...`);
    
    // -- Check if the player is already in a lobby, if they aren't, throw error and continue.
    let CheckIfPlayerIsAlreadyInALobby = this.FindLobbyBySID(Number(sid))
    if (CheckIfPlayerIsAlreadyInALobby.length > 0) {
      Logger.warn(
        `Lobby.JoinLobby - ${sid} Player seems to be in a lobby already...`
      );
      return CheckIfPlayerIsAlreadyInALobby;
    } else {
      
    }
    // --

    let LobbyToJoin;
    
    // -- Check if there are any available lobbies that the player can join,       
    // If there are no available lobbies to join, create one.
    LobbyToJoin = this.FindAvailableLobby();
    if (LobbyToJoin.length == 0 || !LobbyToJoin) {
      Logger.info(`Lobby.JoinLobby - ${sid} There are no lobbies available! Creating...`);
      LobbyToJoin = this.CreateLobby();
    }
    // -- 
  
    // Add user's data to the available lobby.
    LobbyToJoin[0].players.push(Number(sid));
    LobbyToJoin[0].playerCount++;

    Logger.info(`Lobby.JoinLobby - ${sid} Joined lobby: ${JSON.stringify(LobbyToJoin[0])}`);
    return LobbyToJoin;
    
  }

  LeaveLobby(sid) {
    
    sid = Number(sid)
    
    // Find lobby of sid
    let LobbyToLeave = this.FindLobbyBySID(sid)

    // If the result was empty, it means either player's
    // version or sid does not match any lobby.
    if (LobbyToLeave.length == 0) {
      //Logger.warn(`Lobby.LeaveLobby - ${sid} seems to be not in any lobbies...`);
      return null;
    } else {
      
      // Remove player's sid from lobby in result and remove 1 from playerCount.
      LobbyToLeave[0].players = LobbyToLeave[0].players.filter(playerSids => {
        return playerSids !== sid;
      });
      LobbyToLeave[0].playerCount--;

      Logger.info(`Lobby.LeaveLobby - Left lobby ${LobbyToLeave[0].id}`);
      return LobbyToLeave;
    }
  }
}

module.exports = Lobby;