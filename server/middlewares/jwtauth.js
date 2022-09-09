import jwt from "jsonwebtoken";

export const generateJWT = (uid) => {
  const payload = { uid };
  const generateToken = jwt.sign(payload, "" + process.env.SECRET_PRIVATE_KEY, {
    expiresIn: "5h",
  });
  return generateToken;
};

export const checkJWT = (token) => {
  const payload = jwt.verify(token, "" + process.env.SECRET_PRIVATE_KEY);
  return payload;
};