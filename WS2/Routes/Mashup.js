const Mashup = require('express').Router(),
      Serializer = require("../Modules/Serializer")

Mashup.post("/getCurrentMap", (req, res) => {

    let getCurrentMap = {
        mapName: "NoMap",
        version: 0,
        url: ""
    }

    res.type("application/x-www-form-urlencoded")
    res.send(
        Serializer(getCurrentMap)
    )

})

Mashup.post("/getMetadata", (req, res) => {

  res.send("")
    
})

module.exports = Mashup;
