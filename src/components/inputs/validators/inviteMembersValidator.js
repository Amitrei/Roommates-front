import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
});

export const validateEmailField = (email) => {
  return schema.validate({ email });
};
