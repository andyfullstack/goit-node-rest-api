import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/index.js";

const { SECRET_KEY } = process.env;

const validateJWT = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(token);
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

export default validateJWT;
