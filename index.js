const cryptoAES = require("./crypt")

const { encryptedData } = cryptoAES.encrypt("dougtq-2019-github")

cryptoAES.decrypt(encryptedData)
