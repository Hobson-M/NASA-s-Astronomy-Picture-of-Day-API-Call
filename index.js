// MODULE SETUP 

var express = require('express')
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var mongoose = require('mongoose');
var Nasa = require('/home/hobson/Desktop/practice/NASA-API/user.js')

/*************************************************************************************************/

// APP CONFIGURATION
app.use(session({
    secret : 'NASA',
    resave : false,
    saveUninitialized : false
}));

app.use(bodyParser.urlencoded({extended : true}));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/nasa-page', (err)=> {
    if (err) {
        console.log(`Not Connected to Database`)
    } else {
        console.log(`Connected to Database`)
    }
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(Nasa.authenticate()))
passport.serializeUser(Nasa.serializeUser());
passport.deserializeUser(Nasa.deserializeUser());
/****************************************************************************************************/









/**************************************************************************************************/

// ROUTE SETUP

// 1. HOME ROUTE

app.get('/home', (req, res)=> {
    request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (err, response, body) => {
       
        if (err) {
            console.log(`Not Connected to API`)
        } else {
            var n = JSON.parse(body)
            res.render('/home/hobson/Desktop/practice/NASA-API/views/index.ejs', {nasa : n})
        }
    })
})

// 2. SIGNUP ROUTE

app.get('/signup', (req, res)=>{
    res.render('/home/hobson/Desktop/practice/NASA-API/views/signup.ejs')
})

// 2.1 SIGNUP POST ROUTE

app.post('/signup', (req, res)=> {
    var username = req.body.username;
    var password = req.body.password;

    Nasa.register(new Nasa({username : username}), password, (err, user)=> {
        if (err) {
            console.log(`New User Not Created`)
            console.log(err.message)
        } else {
            passport.authenticate('local')(req, res, ()=> {
                res.redirect('/home')
            })
        }
    })
})


/// 3. LOGIN ROUTE

app.get('/login', (req, res)=> {
res.render('/home/hobson/Desktop/practice/NASA-API/views/login.ejs');
})






/***************************************************************************************************/

//SERVER SETUP

app.listen(8030, ()=>{
    console.log(`Server is On`)
})