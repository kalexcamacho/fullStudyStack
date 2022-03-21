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

//---------------------------------------------- usersRouter -----------------------------------------------------------------------
let usersStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'./public/images/usersProfileImages')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
let usersUpload = multer({usersStorage: usersStorage});

//---------------------------------------------- controllers requires -----------------------------------------------------------------------

const mainController = require('../controllers/mainController') /* modificar y organizar con los 2 archivos de controladores */

//---------------------------------------------- usersRouter -----------------------------------------------------------------------

router.get('/', mainController.index);

router.get('/login', mainController.login);

router.get('/register', mainController.register);
router.post('/register', usersUpload.single(/* agregar input de imagen al formulario de register y poner aqui el nombre */), mainController.storeProfile);

router.get('/search', mainController.search);

//---------------------------------------------- productsRouter -----------------------------------------------------------------------

router.get('/productDetail', mainController.productDetail);

router.get('/productCart', mainController.productCart);

router.get('/newProduct', mainController.newProduct);
router.post('/newProduct', productsUpload.single('productImage'), mainController.storeNewProduct);

router.get('/modifyProduct', mainController.modifyProduct);
router.put('/modifyProduct', productsUpload.single('productImage'), mainController.updateModifiedProduct);

router.delete('/deleteProduct', mainController.updateModifiedProduct);

module.exports = router;