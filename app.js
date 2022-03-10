const express = require("express");
const path = require('path');
const app = express();
const mainRouter = require('./src/routes/mainRouter')

// Configuración
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, './src/views'));

// Rutas
app.use('/', mainRouter);


app.listen(process.env.PORT || 3000, () => console.log('Server running in 3000 port'));
