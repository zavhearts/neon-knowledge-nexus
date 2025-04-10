
const crypto = require('crypto');

/**
 * Generate a random token
 * @param {boolean} numeric - Whether to generate a numeric token
 * @returns {string} - Generated token
 */
exports.generateToken = (numeric = false) => {
  if (numeric) {
    // Generate a 6-digit numeric token
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // Generate a random string token
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Verify token expiration
 * @param {Date} expires - Token expiration date
 * @returns {boolean} - Whether token is valid
 */
exports.isTokenValid = (expires) => {
  return new Date() < new Date(expires);
};
