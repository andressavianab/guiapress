const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//importing all the CategoriesController script to this file
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

//to use 'connection' function, import from database/database.js
const connection = require('./database/database');

const port = 8080;

//bodyparser configs (to work with forms)
    // parse applicaction/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));
    // parse application/json
    app.use(bodyParser.json());

//view (to render the ejs files aka frontend)
app.set('views', path.join('src', 'views'));
app.set('view engine', 'ejs');

//static files config (to node work with images and css files)
app.use(express.static("public"));

//athenticating to database
connection.authenticate()
.then(() => {
    console.log('the connection to the the guiapress database has been successfully established');
}).catch((error) => {
    console.log(error)
});

/*"telling" the express server i want to use the categoriesController
script, the routes!*/
app.use('/', categoriesController);
app.use('/', articlesController);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log("the server's port is " + port)
});