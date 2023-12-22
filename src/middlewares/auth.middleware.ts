import AuthService from '@src/services/auth.service';
import { NextFunction, Request, Response } from 'express';

export function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  const token = req.headers['x-access-token'];
  const decoded = AuthService.decodeToken(token as string);
  req.decoded = decoded;
  next();
}
