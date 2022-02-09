import jwt, { JwtPayload } from "jsonwebtoken";

const createAccessToken = (payload: object) => {
  const _token = jwt.sign(
    { data: payload },
    process.env.JWT_ACCESS_KEY as jwt.Secret,
    {
      expiresIn: "15m",
    }
  );
  return _token;
};
const createRefreshToken = (payload: object) => {
  const _token = jwt.sign(
    { data: payload },
    process.env.JWT_REFRESH_KEY as jwt.Secret,
    {
      expiresIn: "1y",
    }
  );
  return _token;
};

const verfyAccessToken = (
  token: string
): {
  payload: string | JwtPayload | null;
  jwtError?: any | null;
} => {
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_KEY as jwt.Secret);
    console.log(`---Verified Access Token ---`);
    return { payload };
  } catch (error) {
    console.log(`---Access Token Failed---`);
    return { payload: null, jwtError: error };
  }
};
const verfyRefreshToken = (
  token: string
): {
  payload: string | JwtPayload | null;
  jwtError?: any | null;
} => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_KEY as jwt.Secret
    );
    console.log(`---Verified Refresh Token ---`);

    return { payload };
  } catch (error) {
    console.log(`---Refresh Token Failed ---`);
    return { payload: null, jwtError: error };
  }
};

export {
  createAccessToken,
  createRefreshToken,
  verfyAccessToken,
  verfyRefreshToken,
};
