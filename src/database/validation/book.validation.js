import Joi from "joi"

export const bookValidation = Joi.object({
    title: Joi.string().min(2).required(),
    author: Joi.string().min(2).required(),
    publishedYear: Joi.number().required(),
    availableCopies: Joi.number().min(0).default(1)
})