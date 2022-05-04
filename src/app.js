const express = require("express");
const path = require('path');
const app = express();
const methodOverride =  require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

// Configuración meddlewares---------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({secret: 'secret', resave:false,saveUninitialized:false}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userLoggedMiddleware);

// Configuración template engine---------------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

// Rutas
app.use('/', usersRouter);
app.use('/', productsRouter); 


app.listen(process.env.PORT || 3000, () => console.log('Server running in 3000 port'));
