const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const productsController = {
//-------------------------------------------------- productsController--------------------------------
productDetail: (req, res) => res.render('./products/productDetail'),

productCart: (req, res) => res.render('./products/productCart'),

newProduct: (req, res) => res.render('./products/newProduct'),
storeNewProduct: (req, res) =>{
    res.redirect('./users/index')
},

modifyProduct: (req, res) => res.render('./products/modifyProduct'),
updateModifiedProduct: (req, res) =>{
    res.redirect('./users/index')
},
}
module.exports = productsController;
