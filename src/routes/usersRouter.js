const express = require('express');
const router = express.Router();
const multer = require ('multer');


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

const usersController = require('../controllers/usersController') /* modificar y organizar con los 2 archivos de controladores */

//---------------------------------------------- usersRouter -----------------------------------------------------------------------

router.get('/', usersController.index);

router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', usersUpload.single(/* agregar input de imagen al formulario de register y poner aqui el nombre */), usersController.storeProfile);

router.get('/search', usersController.search);



module.exports = router;