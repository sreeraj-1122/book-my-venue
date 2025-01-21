import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User from '../models/user.model';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies?.authToken;

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

    // Find the user in the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
