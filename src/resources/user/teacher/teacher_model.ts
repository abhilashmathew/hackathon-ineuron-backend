import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface TeacherI {
  name: string;
  email: string;
  password: string;
  isPasswordValid(password: string): Promise<boolean>;
}

interface TeacherDocument extends TeacherI, Document {}

const teacherSchema = new Schema<TeacherDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
teacherSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const TeacherModel = model<TeacherDocument>('Teacher', teacherSchema);

export { TeacherI, TeacherDocument, TeacherModel };
