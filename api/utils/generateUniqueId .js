const crypto = require("crypto");

// Function to generate a unique 32-character ID
const generateUniqueId = () => {
  return crypto.randomBytes(16).toString("hex"); // Generates a 32-character hex string
};

module.exports = generateUniqueId;
