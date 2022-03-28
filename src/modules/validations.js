const Joi = require("joi");

module.exports = class Validations {
    static async SignUpValidation(data) {
        return await Joi.object({
            username: Joi.string()
                .required()
                .min(2)
                .max(64)
                .trim()
                .error(new Error("Isimda xato bor")),
            email: Joi.string()
                .email()
                .required()
                .trim()
                .lowercase()
                .error(new Error("Emailda xato bor")),
            password: Joi.string()
                .required()
                .min(4)
                .max(128)
                .error(new Error("Parolda xato bor")),
        }).validateAsync(data);
    }
    static async SignInValidation(data) {
        return await Joi.object({
            email: Joi.string()
                .email()
                .required()
                .trim()
                .lowercase()
                .error(new Error("Emailda xato bor")),
            password: Joi.string()
                .required()
                .min(4)
                .max(128)
                .error(new Error("Parolda xato bor")),
        }).validateAsync(data);
    }

    static async AddAdsValidation(data) {
        return await Joi.object({
            title: Joi.string()
                .required()
                .min(1)
                .max(128)
                .trim()
                .error(new Error("Sarlavhada xato bor.")),
            price: Joi.number()
                .min(0)
                .required()
                .error(new Error("Narxda xato bor")),
            currency: Joi.string()
                .required()
                .min(1)
                .max(100)
                .error(new Error("Currency xato bor.")),
            description: Joi.string()
                .required()
                .min(8)
                .max(1024)
                .error(new Error("Ta'rifda xato bor.")),
            location: Joi.string()
                .required()
                .min(1)
                .max(1024)
                .error(new Error("Location xato bor.")),
            category: Joi.string()
                .required()
                .error(new Error("Kategoriyada xato bor.")),
            photos: Joi.string(),
            phone: Joi.string()
                .required()
                .error(new Error("Raqam o'zbekistonni emas"))
                .regex(/^\+998(9[01345789]|3[3])[0-9]{7}$/),
        }).validateAsync(data);
    }

    static async CreateCategoryValidation(data) {
        return await Joi.object({
            category_name: Joi.string()
                .required()
                .min(4)
                .max(128)
                .trim()
                .error(new Error("Kategoriya nomida xato bor.")),
        }).validateAsync(data);
    }


    static async MessagesValidation(data) {
        return await Joi.object({ 
            message_text: Joi.string().required().trim().max(1024).min(2).trim().error(new Error("Message is invalid")),  
        }).validateAsync(data);
    }


    
    
};