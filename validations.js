const Joi = require('joi'); 

exports.validate_user = (user) => {
    const schema = {
        user_id  : Joi.string().min(5).required(),
        email    : Joi.string().email().required(),
        password : Joi.string().min(5).required(),
        is_admin : Joi.string().valid(["0", "1"])
    };
    
    const result = Joi.validate(user, schema);
    if(result.error)
        return {
            isValid : false,
            message : result.error.details[0].message
        };
    else
        return  {
            isValid : true
        };; 
};