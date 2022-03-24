const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dataBaseProducts.json');

const productsController = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./products/allProducts', {products})
    },

    productDetail: (req, res) =>{
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let specificProduct = products.find((specificProduct)=> specificProduct.productId == req.params.id);  
        res.render('./products/productDetail', {specificProduct});
	},
    
    productCart: (req, res) => res.render('./products/productCart'),

    newProduct: (req, res) => res.render('./products/newProduct'),
    storeNewProduct: (req, res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let newProduct = {
            productId: Date.now(),
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productImage: req.file.filename,	
            productCategory: req.body.productCategory,	
            productPrice: req.body.productPrice
		}
		products.push(newProduct);

		let productsJSON=JSON.stringify(products, null, 2);
		fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect('/products');
    },

    modifyProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let productToEdit = products.find((specificProduct)=> specificProduct.productId == req.params.id);
        res.render('./products/modifyProduct', {productToEdit})
    },
    updateModifiedProduct: (req, res) =>{
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let productToEdit = products.find((specificProduct)=> specificProduct.productId == req.params.id);
        productToEdit.productName= req.body.productName;
        productToEdit.productDescription= req.body.productDescription;
        productToEdit.productCategory= req.body.productCategory;
        productToEdit.productPrice= req.body.productPrice;
        productToEdit.productImage = req.file.filename;
        
    let productsJSON=JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, productsJSON);

    res.redirect('/products');
    },

    deleteProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let listWithoutDeletedProduct = products.filter((productToDelete)=> productToDelete.productId != req.params.id);

		let productsJSON=JSON.stringify(listWithoutDeletedProduct, null, 2);
		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect('/products');
    }
}
module.exports = productsController;
