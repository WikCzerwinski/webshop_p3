const express = require('express');
const router = express();
let path = require('path');
router.set('view engine', 'ejs');
const ejs = require('ejs');
const PORT = 3000;

router.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
router.use('/styles', express.static(path.join(__dirname, 'styles')));
router.use('/views', express.static(path.join(__dirname, 'views')));
router.use('/img', express.static(path.join(__dirname, 'img')));

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
router.get('/', function (req, res, next) {
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products")
        .then(async response => {
            data = await response.json();

            res.render('index', { products: data });
        }).catch(error => {
            console.log("Failed to load groups:", error);
            res.render('error', { message: error });
        });
    
});
router.get('/products', function (req, res, next) {
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products")
        .then(async response => {
            data = await response.json();

            res.render('products', { products: data });
        }).catch(error => {
            console.log("Failed to load groups:", error);
            res.render('error', { message: error });
        });
    
});
router.get('/product', function (req, res, next) {
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products")
        .then(async response => {
            data = await response.json();

            res.render('product', { products: data });
        }).catch(error => {
            console.log("Failed to load groups:", error);
            res.render('error', { message: error });
        });
    
});
