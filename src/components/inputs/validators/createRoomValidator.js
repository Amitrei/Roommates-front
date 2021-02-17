import Joi from "joi";

const roomNameSchema = Joi.object({
  name: Joi.string().required().min(3),
});

export const validateRoomName = (name) => {
  return roomNameSchema.validate({ name });
};
