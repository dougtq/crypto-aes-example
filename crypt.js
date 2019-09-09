const crypto = require("crypto")
const algorithm = "aes-256-cbc"

const key = process.env.ENCRYPT_KEY || crypto.randomBytes(32)
const iv = process.env.ENCRYPT_IV || crypto.randomBytes(16)

function encrypt (text) {
    console.info("Encrypt Key", key)
    console.info("Encrypt iv", iv)
    console.info("Source str", text)

    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)

    let encrypted = cipher.update(text)

    encrypted = Buffer.concat([encrypted, cipher.final()])

    console.info("Encrypted text", encrypted.toString("hex"))

    return { encryptedData: encrypted.toString("hex") }
}

function decrypt (text) {
    // let iv = Buffer.from(iv, 'hex')

    let encryptedText = Buffer.from(text, 'hex')
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)

    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    console.info("Decrypted text", decrypted.toString())

    return decrypted.toString()
}

module.exports = {
    encrypt,
    decrypt
}
