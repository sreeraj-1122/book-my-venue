import { OAuth2Client } from 'google-auth-library';
import { config } from '../config';

const client = new OAuth2Client(config.googleClientId);

export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId
    });
    
    return ticket.getPayload();
  } catch (error) {
    throw new Error('Invalid Google token');
  }
};
