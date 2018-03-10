

const express = require('express');
const hbs = require('hbs');

var app = express();

/**
 * Rendering Html page using express Middleware
 * __dirname variable will be injected by wrapper fuction
 * 
*/

app.set('view engine','hbs');
app.use(express.static(__dirname +'/views'));
app.get('/',(req, res) => {
    res.send({
        name : 'Bharath',
        likes : [
            'Driving',
            'Coding',
            'Travelling'
        ]
    });
});
app.get('/about',(req, res) => {
    res.send('<h3>About Page<h3>');
});

app.get('/about-hbs', (req,res) => {
    res.render('about.hbs',{
        pageTitle : 'Guru Technologies',
        currentYear : new Date().getFullYear()
    });
});

app.get('/home', (req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Home page',
        welcomeMessage : 'Welcome to Guru Technologies',
        currentYear : new Date().getFullYear()
    });
})

app.get('/bad', (req, resp) => {
    resp.send({errorMessage : 'Bad request'});
});
app.listen(3000,() => {
    console.log('Server started on port 3000');
});