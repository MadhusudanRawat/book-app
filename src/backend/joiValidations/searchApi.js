import Joi from "joi";
export const searchSchema = Joi.object({
    q: Joi.string().trim().min(1).required().messages({
      'string.base': 'Search query must be a string.',
      'string.empty': 'Search query cannot be empty.',
      'any.required': 'Search query is required.',
    }),
  });

export const bookSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.base': 'Title must be a string.',
      'string.empty': 'Title cannot be an empty string.',
      'string.min': 'Title must be at least 2 characters long.',
      'any.required': 'Title is required.'
    }),

  author: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.base': 'Author must be a string.',
      'string.empty': 'Author cannot be an empty string.',
      'string.min': 'Author must be at least 2 characters long.',
      'any.required': 'Author is required.'
    }),

  cover: Joi.string()
    .uri()
    .optional()
    .allow("")
    .messages({
      'string.base': 'Cover URL must be a string.',
      'string.uri': 'Cover must be a valid URI.',
      'string.empty': 'Cover URL can be an empty string.',
    })
});

