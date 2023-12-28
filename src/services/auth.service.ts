import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/user.model';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    const expiresIn = config.get<number>('App.auth.tokenExpiresIn');
    const key = config.get<string>('App.auth.key');

    return jwt.sign(payload, key, {
      expiresIn,
      algorithm: 'HS256',
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, config.get<string>('App.auth.key')) as DecodedUser;
  }
}
