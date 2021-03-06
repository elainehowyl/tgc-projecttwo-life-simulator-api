const express = require('express');
const session = require('express-session')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
// const passport = require('./passport/setup');
const cors = require('cors');

function setupExpressApp(app) {
    // use handlebars as the view engine (for templates) -- because there many other choices
    app.set('view engine', 'hbs')
    // we want our static files (images, css etc.) to be in a folder named public
    app.use(express.static('public'))
    // allows express to process data submitted via forms
    app.use(express.urlencoded({ extended: false }))
    // allows express to process data submitted via JSON 
    app.use(express.json());


    app.use(cookieParser("secret"))
    app.use(session({
        'cookie': {
            maxAge: 60000
        }
    }))
    app.use(flash())

    // register a middleware for the flash message
    app.use(function (req, res, next) {
        res.locals.success_messages = req.flash('success_messages');
        res.locals.error_messages = req.flash('error_messages');
        next();
    })

    // app.use(passport.initialize());
    // app.use(passport.session())

    app.use(cors());

    // app.use(function(req, res, next) {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header("Access-Control-Allow-Origin", 'GET, POST, PATCH, DELETE, OPTIONS');
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });
    // app.use(cors({
    //     origin:'*'
    //   })
    // );
    // app.options('*', cors({
    //     origin:'*'
    //   })
    // );

}

module.exports = { setupExpressApp };