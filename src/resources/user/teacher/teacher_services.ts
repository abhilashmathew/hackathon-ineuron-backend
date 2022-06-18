import { TeacherDocument, TeacherI, TeacherModel } from './teacher_model';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/helpers/token_helper';
import UserPayloadI from '../../../utils/interfaces/jwt_user_payload';

type TeacherWith_Id = TeacherDocument & {
  _id: unknown;
};
type ResponseWithToken = {
  accessToken: string;
  refreshToken: string;
  user: TeacherWith_Id;
};

type SingleTeacher = TeacherWith_Id | null;

const registerTeacher = async (user: TeacherI): Promise<ResponseWithToken> => {
  const _user = await TeacherModel.create(user);

  const payload: UserPayloadI = {
    id: _user._id,
    name: _user?.name,
    type: 'teacher',
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  return { accessToken, refreshToken, user: _user };
};

const loginTeacher = async (
  email: string,
  password: string
): Promise<ResponseWithToken> => {
  const user = await TeacherModel.findOne({ email });
  if (!user) throw new Error('Teacher not found');

  if (!(await user.isPasswordValid(password)))
    throw new Error('Invalid Password');

  const payload: UserPayloadI = {
    id: user._id,
    name: user?.name,
    type: 'teacher',
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { accessToken, refreshToken, user };
};

const getAllTeachers = async (): Promise<TeacherWith_Id[]> => {
  const users = await TeacherModel.find().select('-__v -password');
  return users;
};

const getTeacher = async (userId: string): Promise<SingleTeacher> => {
  const users = await TeacherModel.findById(userId).select('-__v -password');
  return users;
};
const deleteTeacher = async (userId: string): Promise<SingleTeacher> => {
  const users = await TeacherModel.findByIdAndDelete(userId).select(
    '-__v -password'
  );
  return users;
};

export default {
  registerTeacher,
  loginTeacher,
  getTeacher,
  getAllTeachers,
  deleteTeacher,
};
