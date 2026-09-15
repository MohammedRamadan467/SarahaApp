import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );
};