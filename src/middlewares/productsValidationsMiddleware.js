const {body} = require('express-validator');

const productsValidations = [
    body('productName').notEmpty().withMessage('Es necesario que definas un nombre para el producto'),
    body('productCategory').isLength({min:1}).withMessage('Es necesario que definas una categoria del producto'),
    body('productPrice').notEmpty().withMessage('Es necesario que especifiques un precio'),
]

module.exports = productsValidations;