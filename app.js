const express = require("express");
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});
app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});
app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/views/ProductDetail.html');
});
app.get('/productCart', (req,res)=>{
    res.sendFile(__dirname + '/views/ProductCart.html');
});

app.listen(process.env.PORT || 3000, () => console.log('Server running in 3000 port'));
