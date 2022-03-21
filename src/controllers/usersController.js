const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');


const usersController = {
    //-------------------------------------------------- usersController--------------------------------
    index: (req, res) => res.render('./users/index')/*Modificar el index para que trabaje tomando como datos el archivo .json*/,

    login: (req, res) => res.render('./users/login'),

    register: (req, res) => res.render('./users/register'),

    storeProfile: (req, res) =>{
        res.redirect('./users/index')
    },

    search: (req, res) => res.render('./users/results'),
}
module.exports = usersController;