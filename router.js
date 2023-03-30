const express = require('express');
const router = express();
let path = require('path');
router.set('view engine', 'ejs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const PORT = 3000;




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
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/products")
    .then(async response => {
        data = await response.json();
        res.render('adminPanel', { products: data });
    }).catch(error => {
        res.render('error', { message: error });
    });
});

router.get('/adminPanelUsers', function (req, res, next) {
    Promise.all([
        fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/users"),
        fetch('https://roc.tngapps.com/' + 'TPWQ283' + "/basketitems")
    ])
        .then(async responses => {
            let [usersResponse, basketItemsResponse] = responses;
            let usersData = await usersResponse.json();
            let basketItemsData = await basketItemsResponse.json();
            res.render('adminPanelUsers', { users: usersData, basketitems: basketItemsData });
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





router.get('/login', (req, res) => {
    res.render("login.ejs")
})

router.get('/register', (req, res) => {
    res.render("register.ejs")
})


router.post('/login', function (req, res, next) {
    const { EMail } = req.body;

    // Make a GET request to retrieve the list of users from the external API
    fetch('https://roc.tngapps.com/TPWQ283/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => {
            const users = await response.json();
            const user = users.find(u => u.EMail === EMail);

            if (user) {
                // If user is found, redirect to index page or perform some other action
                res.redirect('/');
            } else {
                // If user is not found, render the login page with an error message
                res.render('login', { errorMessage: 'Invalid email or password.' });
            }
        })
        .catch(error => {
            res.render('error', { message: error });
        });
});

router.post('/register', function (req, res, next) {

    const {Name, EMail, Password} = req.body
    if (!Name || !EMail || !Password) {

        res.redirect('/register');
        return;
    }

    let newUser = {
         Name: req.body.Name,
         EMail: req.body.EMail,
         Password: req.body.Password,
         UserLevel: 1,
    }; console.log(newUser)
    fetch('https://roc.tngapps.com/' + 'TPWQ283' + '/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => {
            res.redirect('/login');
        })
        .catch(error => {
            res.render('error', { message: error });
        });
});