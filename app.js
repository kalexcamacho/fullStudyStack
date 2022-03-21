const express = require("express");
const path = require('path');
const app = express();
const methodOverride =  require('method-override');
const mainRouter = require('./src/routes/mainRouter');

// Configuración meddlewares---------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración template engine---------------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './src/views'));

// Rutas
app.use('/', mainRouter); /* modificar y organizar con los 2 archivos de rutas */


app.listen(process.env.PORT || 3000, () => console.log('Server running in 3000 port'));
