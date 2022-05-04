const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const productsValidations = require('../middlewares/productsValidationsMiddleware');

//---------------------------------------------- productsRouter -----------------------------------------------------------------------

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'./public/images/productsImages')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
        
    }
})
let upload = multer({storage});

//---------------------------------------------- controllers requires -----------------------------------------------------------------------

const productsController = require('../controllers/productsController') 

//---------------------------------------------- productsRouter -----------------------------------------------------------------------
router.get('/products', productsController.index);

router.get('/productDetail/:id', productsController.productDetail);

router.get('/productCart', productsController.productCart);

router.get('/newProduct', productsController.newProduct);
router.post('/newProduct', upload.single('productImage'), productsValidations, productsController.storeNewProduct);

router.get('/modifyProduct/:id', productsController.modifyProduct);
router.put('/modifyProduct/:id', upload.single('productImage'), productsController.updateModifiedProduct);

router.delete('/productDetail/:id', productsController.deleteProduct);

module.exports = router;