const DancerCard = require("express").Router();
const DancerCardDB = require.main.require("./DB/models/DancerProfile");

DancerCard.post("/UploadDancerProfile", async (req, res) => {
  
  const Dancercard = await DancerCardDB.findOne({ userId: req.profile.userid });
  const { avatar, country, name, songsPlayed, stars, unlocks, wdfRank } = req.body
  
  try {
    
      switch (Dancercard) {

      // If the requested dancercard returns null or undefined,
      // it means the player doesn't have a card so we create one.

      case null:
      case undefined:

        console.log(`${name} does not have a profile! Creating...`);

        const newProfile = new DancerCardDB({
          userId: req.profile.userid,
          avatar,
          country,
          name,
          songsPlayed,
          stars,
          unlocks,
          wdfRank
        });
        await newProfile.save()
        return res.send("");


      // By default, we update user's dancercard by their body keys.
      // Some keys such as "_id" and "userId" shouldn't be changed so we skip them.
      default:

        for (const key in req.body) {

            switch(key) {
              case "_id":
              case "userId":
                continue
                break;
            }
            if (Dancercard[key])
              Dancercard[key] = req.body[key];
              Dancercard.markModified(key)
        }
          
        await Dancercard.save()
        return res.send(Dancercard)

    }
    
  }
  catch(e) {
    
    return res.status(400).send({
      errorName: e.name || "",
      errorMessage: e.message || ""
    })
    
  }

 
});

module.exports = DancerCard;
