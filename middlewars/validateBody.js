import { HttpError } from "../helpers/index.js";

const validateBody = schema => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    const contactLength = Object.keys(req.body).length;
    if (contactLength < 1) {
      next(HttpError(400, "Body must have at least one field"));
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
export default validateBody;
