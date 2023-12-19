import mongoose, { Document, Model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.path('email').validate(async (email: string) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, 'already exists in the database');

export const User: Model<User> = mongoose.model<User>('User', schema);
