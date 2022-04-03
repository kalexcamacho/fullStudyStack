const {body} = require('express-validator');

const registerValidations = [
    body('userName').notEmpty().withMessage('Es necesario que escribas tu nombre completo'),
    body('userCategory').isLength({min:1}).withMessage('Es necesario que elijas un tipo de usuario'),
    body('userEmail').notEmpty().withMessage('Es necesario que escribas un email'),
    body('userPassword').notEmpty().withMessage('Es necesario que escribas una contraseña')
]

module.exports = registerValidations;