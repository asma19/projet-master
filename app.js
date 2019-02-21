const express = require("express")
const app = express()
const db = require('./config/database')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportSetup = require('./config/passport_setup')
const flash = require('connect-flash')
const port = process.env.PORT || 3000;
const server = require('http').Server(app); 
const methodOverride = require('method-override');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// bring passport 
app.use(passport.initialize())
app.use(passport.session())

//store user object 

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})


//bringg ejs template
app.set('view engine', 'ejs')

// bringg body parser 
// analyse de l'application / x-www-form-urlencoded 
app.use(express.static('public'))
app.use(express.static('node_modules'))


// session and flash config .
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))
app.use(flash())
// bring passport 
app.use(passport.initialize())
app.use(passport.session())



app.get('/', (req, res) => {

    res.redirect('/products')
})
//bring product routes 
const products = require('./routes/product-routes')
app.use('/products', products)

//bring user routes
const users = require('./routes/user-routes')
app.use('/users', users)

//listen t port 3000
app.listen(3000, () => {

    console.log('app is working en port 3000')
})