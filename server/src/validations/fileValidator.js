import Joi from 'joi';

const fileSchema = Joi.object({
  original_name: Joi.string().required(),
  current_name: Joi.string().required(),
  type: Joi.string().required(),
  path: Joi.string().required(),
  size: Joi.number().required()
});

export default fileSchema;
