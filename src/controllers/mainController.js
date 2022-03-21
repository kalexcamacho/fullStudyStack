const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const controller = {
    //-------------------------------------------------- usersController--------------------------------
    index: (req, res) => res.render('./users/index')/*Modificar el index para que trabaje tomando como datos el archivo .json*/,

    login: (req, res) => res.render('./users/login'),

    register: (req, res) => res.render('./users/register'),

    storeProfile: (req, res) =>{
        res.redirect('./users/index')
    },

    search: (req, res) => res.render('./users/results'),
    //-------------------------------------------------- productsController--------------------------------
    productDetail: (req, res) => res.render('./products/productDetail'),

    productCart: (req, res) => res.render('./products/productCart'),

    newProduct: (req, res) => res.render('./products/newProduct'),
    storeNewProduct: (req, res) =>{
        res.redirect('./users/index')
    },

    modifyProduct: (req, res) => res.render('./products/modifyProduct'),
    updateModifiedProduct: (req, res) =>{
        res.redirect('./users/index')
    },
}

module.exports = controller;