/*
  -- Token.js
 Decrypt and check NAS token.

 -- Primarily made for Wii.
*/
const GameIDs = require("./GameIDs");
const Logger = require.main.require("./Logger")
const crypto = require("crypto");

class Token {
	constructor() {
	  
    // AES 256 keys
		this.secret_key = 'fd85b494-aaaa';
		this.secret_iv = 'smslt';
		this.encryption = 'AES-256-CBC';
		this.key = crypto.createHash('sha512').update(this.secret_key, 'utf-8').digest('hex').substr(0, 32);
		this.iv = crypto.createHash('sha512').update(this.secret_iv, 'utf-8').digest('hex').substr(0, 16);

	}
	
	Decrypt(token) {
    
    if (token.startsWith("NDS")) {
      const [ header, userid, gameid, lang, region, sid ] = token.split("/")

      return {
        header,
        userid: Number(userid),
        gameid,
        gameversion: GameIDs.GetById(gameid.slice(0, -1)),
        lang,
        region,
        sid: Number(sid)
      }
    }
    
    try {
      
      token = Buffer.from(token).toString("base64")
      
      const buff = Buffer.from(token, "base64");
      token = buff.toString("utf-8");
      const decryptor = crypto.createDecipheriv(this.encryption, this.key, this.iv);
      const decryptedResult = (decryptor.update(token, "base64", "utf8") + decryptor.final("utf8"))

      const [ header, userid, gameid, lang, region, sid ] = decryptedResult.split("/")

      return {
        header,
        userid: Number(userid),
        gameid,
        gameversion: GameIDs.GetById(gameid.slice(0, -1)),
        lang,
        region,
        sid: Number(sid)
      }
    }
    catch(error) {
      Logger.error(`Token.Decrypt - Error while decrypting: ${error}`)
      return false
    }
    
	}
	
	Encrypt(content) {
		  var encryptor = crypto.createCipheriv(this.encryption, this.key, this.iv);
		  var aes_encrypted = encryptor.update(content, 'utf8', 'base64') + encryptor.final('base64');
		  return Buffer.from(aes_encrypted).toString('base64');
  }
}

module.exports = Token; 