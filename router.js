const express = require('express');
const router = express();
let path = require('path');
router.set('view engine', 'ejs');
const ejs = require('ejs');
const PORT = 3000;
const bodyParser = require('body-parser');


router.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
router.use('/styles', express.static(path.join(__dirname, 'styles')));
router.use('/views', express.static(path.join(__dirname, 'views')));
router.use('/img', express.static(path.join(__dirname, 'img')));
router.use('/javascript', express.static(path.join(__dirname, 'javascript')));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
router.get('/', function (req, res, next) {
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products")
        .then(async response => {
            data = await response.json();
            res.render('index', { products: data });
        }).catch(error => {
            res.render('error', { message: error });
        });
});

router.get('/products', function (req, res, next) {
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products")
        .then(async response => {
            data = await response.json();
            res.render('products', { products: data });
        }).catch(error => {
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
            res.render('error', { message: error });
        });
});

router.post('/deleteProduct/:id', function (req, res, next) {
    let productId = req.params.id;
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + '/products/' + productId, { method: 'DELETE' })
        .then(async response => {
            res.redirect('/adminPanel');
        }).catch(error => {
            res.render('error', { message: error });
        });
});

router.post('/editProduct/:id', function (req, res, next) {
    let productId = req.params.id;
    let updatedProduct = {
        Name: req.body.Name,
        Description: req.body.Description,
        Image: req.body.Image,
        Category: req.body.Category,
        Sizes: req.body.Sizes,
        Colors: req.body.Colors,
        Price: req.body.Price,
        Brand: req.body.Brand,
    };
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + '/products/' + productId, {
        method: 'POST',
        body: JSON.stringify(updatedProduct),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => {
            res.redirect('/adminPanel');
        })
        .catch(error => {
            res.render('error', { message: error });
        });
});

router.post('/createProduct', function (req, res, next) {
    let newProduct = {
        Name: req.body.Name,
        Description: req.body.Description,
        Image: req.body.Image,
        Category: req.body.Category,
        Sizes: req.body.Sizes,
        Colors: req.body.Colors,
        Price: req.body.Price,
        Brand: req.body.Brand,
    };
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + '/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => {
            res.redirect('/adminPanel');
        })
        .catch(error => {
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
            res.render('error', { message: error });
        });
});

