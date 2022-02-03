/* 
  -- Users.js
 Can generate Session IDs and store WDF user requests.

 -- Primarily made for Old and New-Gen.
*/
const Logger = require.main.require("./Logger")
const Lobby = require("./Lobby")
const Scoreboard = require("./Scoreboard")
const Config = require.main.require("./Config").ws1

// Local online players list
let UserList = {
  users: []
};



function RemoveExpiredUsers() {
  
  let interval = Config.Constants.IntervalOfRemovingDeadUsers
  
  UserList.users = UserList.users.filter(user => {
    // If user's interval has passed, remove them from their lobby and erase their score.
    if (Date.now() - user.epoch > (interval * 1000)) {
      Logger.info(`Users.RemoveExpiredUsers - Removed ${user.name} for inactivity of ${interval}.`)
      new Lobby(user.version).LeaveLobby(user.sid)
      new Scoreboard(user.version).DeleteLastScore(user.sid)
    }
    return Date.now() - user.epoch < (interval * 1000)
  })
};





class Users {
  constructor(sid) {
    this.sid = Number(sid);
    RemoveExpiredUsers();
  }

  Init() {
    return UserList;
  }
  
  Count(version) {
    
    // If version exists, limit counting by version.
    if (version) {
      let result = UserList.users.filter(user => {
        return user.version === version
      })
      return result.length;
    }
    
    // If version doesn't exist return amount of all players of all versions.
    else return UserList.users.length;
  }

  Create(userObj) {
    
    // When we create a user, we need to make sure the
    // user's SID is not already in the users array
    // Because our server is really quirky and it does some stuff like that.
    let CheckIfPlayerAlreadyExists = this.FindBySID();

    // Player's SID is already exists, delete it.
    if (CheckIfPlayerAlreadyExists[0]) {
      Logger.info(`Users.Create - ${this.sid} is already in Players array, deleting.`);
      this.Delete();
    }
    
    if (!userObj.bot) {
      Logger.info(`Users.Create - Created ${this.sid} user!`) 
    }

    // Set extra information
    userObj.sid = this.sid;
    userObj.epoch = Date.now();

    // Add the userObj to users array and return userObj.
    UserList.users.push(userObj);
    return userObj;
  }

  Delete() {
    Logger.info(`Users.Delete - Deleting ${this.sid}...`);

    UserList.users = UserList.users.filter(user => {
      return user.sid !== this.sid;
    });
    return true;
  }
  
  Filter(key, value, self_sid) {
    
    let result = UserList.users.filter(user => {
      return user[key] === value
    })
    
    // If sid was given, it means this sid should be skipped.
    if (self_sid) {
      result = result.filter(user => {
         return user.sid !== self_sid;
       });
    }
    
    return result;
    
  }
  
  FindBySID() {
    return UserList.users.filter(user => {
      return user.sid === this.sid;
    });
  }

  Get(update = true) {
    
    let result = this.FindBySID(this.sid);
    
    // If update is true, update result's epoch
    if (update && result[0]) {
      this.Update({
        epoch: Date.now()
      })
    }
    
    return result[0] ? result[0] : {}
  }
  
  ListUsers(list, self_sid, self_version) {
    
    let UsersToList = UserList.users;
    
    // If version was given, it means only players that matches the version should be filtered.
    if (self_version) {
       UsersToList = UsersToList.filter(user => {
         return user.version === self_version;
       });
    }
    
    
    // If sid was given, it means this sid should be skipped.
    if (self_sid) {
       UsersToList = UsersToList.filter(user => {
         return user.sid !== self_sid;
       });
    }
    
    return UsersToList
    
  }
  
  RandomUsers(limit = 10, self_sid, self_version) {
    
    let ShuffledUsers = UserList.users
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    
    // If version was given, it means only players that matches the version should be filtered.
    if (self_version) {
       ShuffledUsers = ShuffledUsers.filter(user => {
         return user.version === self_version;
       });
    }
    
    
    // If sid was given, it means this sid should be skipped.
    if (self_sid) {
       ShuffledUsers = ShuffledUsers.filter(user => {
         return user.sid !== self_sid;
       });
    }
    
    return ShuffledUsers.slice(0, limit)
    
  }

  UserExists() {
    if (this.FindBySID()[0]) return true;
    else false;
  }
  
  Update(contents = {}) {
    
    let findSidProfile = this.FindBySID(this.sid)
    UserList.users[UserList.users.indexOf(findSidProfile[0])] = Object.assign({}, findSidProfile[0], contents)
    
    return;
  }
  
}

module.exports = Users;