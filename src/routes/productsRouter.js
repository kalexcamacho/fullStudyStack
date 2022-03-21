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

router.get('/productDetail', mainController.productDetail);

router.get('/productCart', mainController.productCart);

router.get('/newProduct', mainController.newProduct);
router.post('/newProduct', productsUpload.single('productImage'), mainController.storeNewProduct);

router.get('/modifyProduct', mainController.modifyProduct);
router.put('/modifyProduct', productsUpload.single('productImage'), mainController.updateModifiedProduct);

router.delete('/deleteProduct', mainController.updateModifiedProduct);

module.exports = router;