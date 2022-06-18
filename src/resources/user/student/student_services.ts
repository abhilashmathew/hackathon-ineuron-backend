import { StudentDocument, StudentI, StudentModel } from './student_model';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/helpers/token_helper';
import UserPayloadI from '../../../utils/interfaces/jwt_user_payload';

type StudentWith_Id = StudentDocument & {
  _id: unknown;
};
type ResponseWithToken = {
  accessToken: string;
  refreshToken: string;
  user: StudentWith_Id;
};

type SingleStudent = StudentWith_Id | null;

const registerStudent = async (user: StudentI): Promise<ResponseWithToken> => {
  const _user = await StudentModel.create(user);

  const payload: UserPayloadI = {
    id: _user._id,
    name: _user?.name,
    type: 'student',
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  return { accessToken, refreshToken, user: _user };
};

const getAllStudents = async (): Promise<StudentWith_Id[]> => {
  const users = await StudentModel.find().select('-__v -password');
  return users;
};

const getStudent = async (userId: string): Promise<SingleStudent> => {
  const users = await StudentModel.findById(userId).select('-__v -password');
  return users;
};
const deleteStudent = async (userId: string): Promise<SingleStudent> => {
  const users = await StudentModel.findByIdAndDelete(userId).select(
    '-__v -password'
  );
  return users;
};

export default {
  registerStudent,
  getStudent,
  getAllStudents,
  deleteStudent,
};
