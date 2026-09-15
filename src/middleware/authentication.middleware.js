import jwt from "jsonwebtoken";
import { successResponse } from "../common/utils/index.js";

export const authentication = (req, res, next) => {

  const authorization = req.headers.authorization;

  if (!authorization) {
    return successResponse({
      res,
      message: "Token is required",
      status: 401
    });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return successResponse({
      res,
      message: "Invalid authorization",
      status: 401
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return successResponse({
      res,
      message: "Invalid or expired token",
      status: 401
    });

  }
};