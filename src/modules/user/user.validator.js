import joi from 'joi';

//Regsiter user validator
export const registerUserSchema = joi.object({
    name :joi.string().min(3).max(50).required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).required(),
    phone : joi.string().required(),
    confirmed : joi.boolean(),
    gender : joi.string().valid('male' , 'female').required()

})

//Login user validator

export const loginUserSchema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().required()
})
