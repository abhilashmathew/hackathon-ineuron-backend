import { UserDocument, UserI, UserModel } from './user_model';
import { createAccessToken, createRefreshToken } from '../tokens/token_helper';
import UserPayloadI from '../../utils/interfaces/jwt_user_payload';

type ResponseWithToken = {
  accessToken: string;
  refreshToken: string;
  user: UserDocument & {
    _id: any;
  };
};

type AllUser = (UserDocument & {
  _id: any;
})[];
type SingleUser =
  | (UserDocument & {
      _id: any;
    })
  | null;

const registerUser = async (user: UserI): Promise<ResponseWithToken> => {
  const _user = await UserModel.create(user);

  const payload: UserPayloadI = { id: _user._id, name: _user?.name };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  return { accessToken, refreshToken, user: _user };
};

const loginUser = async (
  email: string,
  password: string
): Promise<ResponseWithToken> => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  if (!(await user.isPasswordValid(password)))
    throw new Error('Invalid Password');

  const payload: UserPayloadI = { id: user._id, name: user?.name };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { accessToken, refreshToken, user };
};

const getAllUsers = async (): Promise<AllUser> => {
  const users = await UserModel.find().select('-__v -password');
  return users;
};

const getUser = async (userId: string): Promise<SingleUser> => {
  const users = await UserModel.findById(userId).select('-__v -password');
  return users;
};
const deleteUser = async (userId: string): Promise<SingleUser> => {
  const users = await UserModel.findByIdAndDelete(userId).select(
    '-__v -password'
  );
  return users;
};

export default { registerUser, loginUser, getUser, getAllUsers, deleteUser };
