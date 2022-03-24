const express = require('express');
const router = express.Router();
const multer = require ('multer');

//---------------------------------------------- productsRouter -----------------------------------------------------------------------

let productsStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'./public/images/productsImages')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
let productsUpload = multer({productsStorage: productsStorage});

//---------------------------------------------- controllers requires -----------------------------------------------------------------------

const productsController = require('../controllers/productsController') 

//---------------------------------------------- productsRouter -----------------------------------------------------------------------
router.get('/products', productsController.index);

router.get('/productDetail/:id', productsController.productDetail);

router.get('/productCart', productsController.productCart);

router.get('/newProduct', productsController.newProduct);
router.post('/newProduct', productsUpload.single('productImage'), productsController.storeNewProduct);

router.get('/modifyProduct', productsController.modifyProduct);
router.put('/modifyProduct', productsUpload.single('productImage'), productsController.updateModifiedProduct);

router.delete('/deleteProduct', productsController.updateModifiedProduct);

module.exports = router;