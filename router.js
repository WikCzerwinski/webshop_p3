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
router.use('/javascript', express.static(path.join(__dirname, 'javascript')));

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

router.get('/adminPanel', function (req, res, next) {
    Promise.all([
        fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/users"),
        fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products"),
        fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/basketitems")
    ])
        .then(async responses => {
            let [usersResponse, productsResponse, basketItemsResponse] = responses;
            let usersData = await usersResponse.json();
            let productsData = await productsResponse.json();
            let basketItemsData = await basketItemsResponse.json();
            res.render('adminPanel', { users: usersData, products: productsData, basketitems: basketItemsData });
        })
        .catch(error => {
            console.log("Failed to load groups:", error);
            res.render('error', { message: error });
        });
});

router.post('/deleteProduct/:id', function (req, res, next) {
    const productId = req.params.id;
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + '/products/' + productId, { method: 'DELETE' })
        .then(async response => {
            res.redirect('/adminPanel');
        }).catch(error => {
            console.log("Failed to delete product:", error);
            res.render('error', { message: error });
        });
});

router.get('/product/:id', function (req, res, next) {
    const productId = req.params.id;
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products/" + productId)
        .then(async response => {
            data = await response.json();
            res.render('product', { product: data });
        }).catch(error => {
            console.log("Failed to load groups:", error);
            res.render('error', { message: error });
        });
});

router.post('/editProduct/:id', function (req, res, next) {
    const productId = req.params.id;
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + '/products/' + productId, { method: 'PUT' })
        .then(async response => {
            res.redirect('/adminPanel');
        }).catch(error => {
            console.log("Failed to delete product:", error);
            res.render('error', { message: error });
        });
});

