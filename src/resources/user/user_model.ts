import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserI {
  name: string;
  email: string;
  password: string;
  isPasswordValid(password: string): Promise<boolean>;
}

interface UserDocument extends UserI, Document {}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const UserModel = model<UserDocument>('User', userSchema);

export { UserI, UserDocument, UserModel };
