import jwt from 'jsonwebtoken';
import { config } from '../config';

// Define the user payload interface
interface UserPayload {
  id: string;
  email: string;
}

// Helper function to ensure secrets are defined
const getSecret = (key: string | undefined, name: string): string => {
  if (!key) {
    throw new Error(`${name} is not defined in the environment variables.`);
  }
  return key;
};

// Generate access token
export const generateAccessToken = (user: UserPayload): string => {
  const secret = getSecret(config.TOKEN.ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET"); 
  return jwt.sign(user, secret, { expiresIn: '1d' });
};

// Generate refresh token
export const generateRefreshToken = (user: UserPayload): string => {
  const secret = getSecret(config.TOKEN.REFRESH_TOKEN_SECRET, "REFRESH_TOKEN_SECRET");
  return jwt.sign(user, secret, { expiresIn: '7d' });
};
