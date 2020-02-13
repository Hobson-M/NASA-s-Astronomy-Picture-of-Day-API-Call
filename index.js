// MODULE SETUP 

var express = require('express')
var app = express();
var request = require('request');


/**************************************************************************************************/

// ROUTE SETUP

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








/***************************************************************************************************/

//SERVER SETUP

app.listen(8030, ()=>{
    console.log(`Server is On`)
})