

const hbs = require('hbs');
const express = require('express');
const fs  = require('fs');


var app = express();
var port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log('Server Started on port 3000');
});

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/views'));


/**
 * Express Middleware
 */
app.use((req, res, next) => {
 /**
  * - Can make DB call to user is autheniticated
  * - Can be used to log the users that are logged in
  */
    var now = new Date().toString();
    var log = 'Req Method: ' + req.method + ' Url : ' + req.originalUrl;
    console.log(`${now}`);
    console.log('Req Method: ',req.method,' Url : ',req.originalUrl);
    fs.appendFileSync('server.log',now +' - '+log +' \n' );
    next();
});


/**
 * Express middleware maintainance scenario
 * 
 */
//  app.use((req, res, next) => {

//     res.render('maintenance.hbs');
//  });


/**
 * Below are the two ways in we can resuse the 
 * variables that can be reusable at multiple places
 * 
 * - streamIt is used to pass the value from front end pages to hbs handlers
 *  
 * 
 */
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Home',
        welcomeMessage : 'Welcome to Guru Technologies',
        
    });
});


app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle : 'About',
       
    });
});



app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        projectMessage: 'node.js-heroku project'
    });
});

