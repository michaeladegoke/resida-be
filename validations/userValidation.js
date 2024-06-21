const joi = require("joi");
const StatusCode = require("../utils/statusCode");
const { formatResult } = require("../utils/formatResult");





exports.authValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
        // googleToken: joi.string(),
       //  facebookToken: joi.string(),
    });

    const validateOptions = {
        aborEarly: false,
        allowUnknown: true,
        stripUnkwown: true,
    };

    const result = formatResult(schema.validate(req.body, validateOptions));

    if (result.error) {
        return res.status(StatusCode.BAD_REQUEST).json({
            error: {
                message: result.message,
            },
        });
    };
    next();
}