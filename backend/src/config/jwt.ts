import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Replace with your actual secret key

/**
 * Generates a JWT token for the given payload.
 * @param {Object} payload - The payload to encode in the token.
 * @param {Object} options - Optional settings for the token.
 * @returns {string} - The generated token.
 */
export const generateToken = (payload, options = {}) => {
  return jwt.sign(payload, secretKey, options);
};

/**
 * Verifies a given JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded payload if verification is successful, otherwise throws an error.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};