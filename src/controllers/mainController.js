const path = require('path');


const controller = {
    index: (req, res) => res.render('./products/index'),
    login: (req, res) => res.render('./users/login'),
    register: (req, res) => res.render('./users/register'),
    productDetail: (req, res) => res.render('./products/productDetail'),
    productCart: (req, res) => res.render('./products/productCart'),
    newProduct: (req, res) => res.render('./products/newProduct'),
    modifyProduct: (req, res) => res.render('./products/modifyProduct')
}

module.exports = controller;