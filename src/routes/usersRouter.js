//---------------------------------------------------------- Requires -----------------------------------------------------------------------
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const usersController = require('../controllers/usersController');
const registerValidations = require('../middlewares/registerValidationsMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authmiddleware')

//---------------------------------------------- Multer Configurations -----------------------------------------------------------------------
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'./public/images/usersProfileImages')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
        
    }
})
let upload = multer({storage});

//---------------------------------------------- usersRouter -----------------------------------------------------------------------

router.get('/', usersController.index);

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess)

router.get('/profile/', authMiddleware, usersController.profile);

router.get('/register',guestMiddleware, usersController.register);
router.post('/register', upload.single('profileImage'), registerValidations, usersController.storeProfile);

router.get('/editProfile/:id', usersController.editProfile);
router.put('/editProfile/:id', upload.single('profileImage'), usersController.updateEditedProfile);

router.delete('/profile/:id', usersController.deleteProfile);

router.get('/search', usersController.search);

router.get('/logout', usersController.logout);



module.exports = router;