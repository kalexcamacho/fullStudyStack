const express = require("express");
const path = require('path');
const app = express();
const methodOverride =  require('method-override');
const productsRouter = require('./src/routes/productsRouter');
const usersRouter = require('./src/routes/usersRouter');

// Configuración meddlewares---------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración template engine---------------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './src/views'));

// Rutas
app.use('/', usersRouter);
app.use('/', productsRouter); 


app.listen(process.env.PORT || 3000, () => console.log('Server running in 3000 port'));
