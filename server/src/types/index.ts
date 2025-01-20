import { Request } from 'express';

export interface User {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  googleId?: string;
  verified: boolean;
  createdAt: Date;
}

export interface OTP {
  email: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}
declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }