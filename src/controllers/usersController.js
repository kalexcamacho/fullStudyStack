const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const User = require('../../models/User');
const { use } = require('express/lib/application');
const bcryptjs = require('bcryptjs');
const res = require('express/lib/response');

const productsFilePath = path.join(__dirname, '../data/dataBaseProducts.json');
const profilesFilePath = path.join(__dirname, '../data/dataBaseProfiles.json');


const usersController = {
    //-------------------------------------------------- usersController--------------------------------
    index: (req, res) =>{ 
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let desarrolloWeb = products.filter(specificProduct=> specificProduct.productCategory == "desarrolloWeb"); 
		let desarrolloMovil =products.filter(specificProduct=> specificProduct.productCategory == "desarrolloMovil");
        let ciberseguridad = products.filter(specificProduct=> specificProduct.productCategory == "ciberseguridad");
        let cienciaDeDatos = products.filter(specificProduct=> specificProduct.productCategory == "cienciaDeDatos");
        let inteligenciaArtificial = products.filter(specificProduct=> specificProduct.productCategory == "inteligenciaArtificial");
                
        res.render('./users/index', {desarrolloWeb, desarrolloMovil, ciberseguridad, cienciaDeDatos, inteligenciaArtificial})
    },

    login: (req, res) => {

        return res.render('./users/login');
    },
    
    loginProcess:(req, res) => {        
        let userToLogin = User.findByField('userEmail', req.body.email);
        if(userToLogin){
            let isOkThePassword = bcryptjs.compareSync(req.body.contraseña, userToLogin.userPassword)
            if(isOkThePassword){
                delete userToLogin.userPassword
                req.session.userLogged = userToLogin;
                return  res.redirect('/profile/')
            }
        }
        return res.render('./users/login',{
            errors: {
                email:{
                    msg: 'Las credenciales son inválidas'
                }
            }
        });
    },
    
    profile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
        let specificProfile = profiles.find((specificProfile)=> specificProfile.userId == req.session.userLogged.userId);          
        res.render('./users/profile', {specificProfile});
        /*console.log('Estas en profile');
        console.log(req.session);
        return res.render('./users/profile',{
            user: req.session.userLogged
        });*/
    },

    register: (req, res) => res.render('./users/register'),
    storeProfile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
		let errorsValidation = validationResult(req);
        let oldData = req.body;
        if(errorsValidation.errors.length > 0){
            return res.render('./users/register',{errors: errorsValidation.errors, oldData})
        }

        let userInDB = User.findByField('userEmail', req.body.userEmail)
        if(userInDB){
            return res.render('./users/register',{
                errors: [{
                    param: 'userEmail',
                    msg:'Este email ya está registrado'
                }],
                oldData: req.body
            });
        }

        let newProfile = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userCategory: req.body.userCategory,
            userPassword: bcryptjs.hashSync(req.body.userPassword,10),
            userImage: (req.file)?req.file.filename:"profile_blank.png"	
		}
        User.create(newProfile);
        res.redirect('/profile/');
    },

    editProfile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
        let profileToEdit = profiles.find((specificProfile)=> specificProfile.userId == req.params.id);
        res.render('./users/editProfile', {profileToEdit})
    },
    updateEditedProfile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
        let profileToEdit = profiles.find((specificProfile)=> specificProfile.userId == req.params.id);
            profileToEdit.userName= req.body.userName;
            profileToEdit.userEmail= req.body.userEmail;
            profileToEdit.userCategory= (req.body.userCategory)?req.body.userCategory:profileToEdit.userCategory;
            profileToEdit.userPassword= (req.body.userPassword)?req.body.userPassword:profileToEdit.userPassword;
            profileToEdit.userImage = (req.file)?req.file.filename:profileToEdit.userImage;
            
        let profilesJSON=JSON.stringify(profiles, null, 2);
        fs.writeFileSync(profilesFilePath, profilesJSON);

        //res.redirect('/profile/' + req.params.id);
        res.redirect('/profile/');
        },

    deleteProfile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
		let listWithoutDeletedProfile = profiles.filter((profileToDelete)=> profileToDelete.userId != req.params.id);

		let profilesJSON=JSON.stringify(listWithoutDeletedProfile, null, 2);
		fs.writeFileSync(profilesFilePath, profilesJSON);

		res.redirect('/');
    },

    search: (req, res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let searchedProduct = req.query.keywords.toLowerCase();
        let obtainedProduct = products.filter((specificProduct) => specificProduct.productName.toLowerCase().includes(searchedProduct));
        res.render('./users/results', {products, searchedProduct, obtainedProduct});
    },

    logout: (req, resp) =>{
        console.log(req.session)
        req.session.destroy(); //destruye todo lo que está en sesión 
        console.log(req.session)
        return res.redirect('/')

    }
}
module.exports = usersController;