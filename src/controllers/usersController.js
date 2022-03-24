const fs = require('fs');
const path = require('path');

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

    login: (req, res) => res.render('./users/login'),

    profile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
        let specificProfile = profiles.find((specificProfile)=> specificProfile.userId == req.params.id);  
        res.render('./users/profile', {specificProfile});
    },

    register: (req, res) => res.render('./users/register'),
    storeProfile: (req, res) =>{
        const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf-8'));
		let newProfile = {
            userId: Date.now(),
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userImage: req.file.filename,	
            userPassword: req.body.userPassword
		}
		profiles.push(newProfile);

		let profilesJSON=JSON.stringify(profiles, null, 2);
		fs.writeFileSync(profilesFilePath, profilesJSON);

        res.redirect('/profile/' + newProfile.userId);
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
            profileToEdit.userPassword= req.body.userPassword;
            profileToEdit.userImage = req.file.filename;
            
        let profilesJSON=JSON.stringify(profiles, null, 2);
        fs.writeFileSync(profilesFilePath, profilesJSON);

        res.redirect('/profile/' + req.params.id);
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
    }
}
module.exports = usersController;