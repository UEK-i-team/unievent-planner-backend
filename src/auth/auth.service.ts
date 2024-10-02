import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      await this.storeToken(decodedToken.uid, token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async storeToken(uid: string, token: string): Promise<void> {
    const user = await this.userModel.findOne({ uid });

    if (user) {
      user.tokens.push(token);
      await user.save();
    } else {
      const newUser = new this.userModel({
        uid,
        tokens: [token],
      });
      await newUser.save();
    }
  }
}
