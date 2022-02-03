const ConstantProvider = require('express').Router();


ConstantProvider.post("/getConstants", (req, res) => {

    Constants = {
        JDWall_Service: {
            FriendsUGC: {
                refresh_time: 120, // Refresh JDWall each 120 seconds.
                max_msg: 5 // Max messages in JDWall.
            }
        }
    }

    res.send(Constants)

})


module.exports = ConstantProvider;
