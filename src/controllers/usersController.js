const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dataBaseProducts.json');


const usersController = {
    //-------------------------------------------------- usersController--------------------------------
    index: (req, res) =>{ 
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let visited=[]; 
		let newProduct=[];
        let highRate = [];
	    products.forEach((specificProduct)=>{
			if (specificProduct.category == "visited"){
				visited.push(specificProduct);
			}else if(specificProduct.category == "newProduct"){
                newProduct.push(specificProduct)
            }else{
				highRate.push(specificProduct);
			}
		})
                
        res.render('./users/index', {visited, newProduct, highRate})
    },

    login: (req, res) => res.render('./users/login'),

    register: (req, res) => res.render('./users/register'),

    storeProfile: (req, res) =>{
        res.redirect('./users/index')
    },

    search: (req, res) => res.render('./users/results'),
}
module.exports = usersController;