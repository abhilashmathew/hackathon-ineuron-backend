import { UserDocument, UserI, UserModel } from './user_model';
import {
  createAccessToken,
  createRefreshToken,
} from '../../utils/helpers/token_helper';
import UserPayloadI from '../../utils/interfaces/jwt_user_payload';
import { StudentModel } from './student/student_model';
import { TeacherModel } from './teacher/teacher_model';

type UserWith_Id = UserDocument & {
  _id: unknown;
};
type ResponseWithToken = {
  accessToken: string;
  refreshToken: string;
  user: UserWith_Id;
};

type SingleUser = UserWith_Id | null;

const loginUser = async (
  email: string,
  password: string
): Promise<ResponseWithToken> => {
  let type: 'teacher' | 'student' = 'student';
  let user: any = await StudentModel.findOne({ email });
  if (!user) {
    user = (await TeacherModel.findOne({ email })) as any;
    type = 'teacher';
  }
  if (!user) throw new Error('User not found');
  if (!(await user.isPasswordValid(password)))
    throw new Error('Invalid Password');

  const payload: UserPayloadI = {
    id: user._id,
    name: user?.name,
    type,
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { accessToken, refreshToken, user };
};

export default { loginUser };
