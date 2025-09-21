const crypto = require('crypto');

// Ensure ENCRYPT_KEY exists
if (!process.env.ENCRYPT_KEY) {
    throw new Error("ENCRYPT_KEY is not set in environment variables");
}

// AES-256-CBC key must be 32 bytes (256 bits)
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
const IV_LENGTH = 16;

function encrypt(text) {
    if (!text) throw new Error("encrypt() requires a valid string");
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
    try {
        if (!text) throw new Error("decrypt() requires a valid string");
        const parts = text.split(':');
        if (parts.length !== 2) throw new Error('Invalid encrypted text format');

        const iv = Buffer.from(parts.shift(), 'hex');
        const encryptedText = Buffer.from(parts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error("Decryption failed:", error);
        return "DECRYPTION_ERROR";
    }
}

module.exports = { encrypt, decrypt };
