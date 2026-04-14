import Joi from "joi"
import mongoose from "mongoose"

export const borrowValidation = Joi.object({
    userId: Joi.string().required().custom((value, helpers) => {
        if(!mongoose.Types.ObjectId.isValid(value)){
            return helpers.message("Invalid userId")
        }
        return value
    }),
    bookId: Joi.string().required().custom((value, helpers) => {
        if(!mongoose.Types.ObjectId.isValid(value)){
            return helpers.message("Invalid bookId")
        }
        return value
    })
})