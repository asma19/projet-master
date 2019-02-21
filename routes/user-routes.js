const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

// configure multer 


isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}
//  login user view 
router.get('/login', (req, res) => {
    res.render('/login', {
        error: req.flash('error')
    })
})

// login post request 
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })
)


// sign up form 
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error')
    })
})

// sign up post request

router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signup',
        failureFlash: true
    })
)

// progile 
router.get('/profile', isAuthenticated, (req, res) => {

    res.render('user/profile', {
        success: req.flash('success')
    })


})

//upload user avatar



// logout user

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})

module.exports = router