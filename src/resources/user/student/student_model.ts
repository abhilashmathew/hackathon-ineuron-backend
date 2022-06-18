import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface StudentI {
  name: string;
  email: string;
  password: string;
  course: string;
  year: number;
  isPasswordValid(password: string): Promise<boolean>;
}

interface StudentDocument extends StudentI, Document {}

const studentSchema = new Schema<StudentDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);
studentSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const StudentModel = model<StudentDocument>('Student', studentSchema);

export { StudentI, StudentDocument, StudentModel };
