const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

//importing all the CategoriesController script to this file
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./user/UsersController');

//to use 'connection' function, import from database/database.js
const connection = require('./database/database');
const Article = require("./articles/articleModel")
const Category = require("./categories/categoryModel");
const User = require("./user/userModel");

const port = 8080;

app.use(cors());

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

//session config https://www.npmjs.com/package/express-session
app.use(session({
    secret: "keyboard cat",
    cookie: {
        maxAge: 604800000
    }
}));

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
app.use('/', usersController);

//index route
app.get("/articles", (req, res) => {
    try {
        Article.findAll({
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {
            res.statusCode = 200;    
            res.json({articles: articles});
    }); 
    } catch (err) {
    res.status(500).send({message: err.message})
   }
}); 

//route to read the article
app.get('/:slug', (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        Category.findAll().then(categories => {
            if(article != undefined) {
                res.render("article", {article: article, categories: categories}); /* to also send the categories to the homenav partial */
            } else {
                res.redirect("/");
            }
        })
    }).catch(error => {
        res.redirect('/');
    })
});

//route to filter the articles by categories
app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        }, include: [
            {
                model: Article
            }
        ] //to filter the article by the category
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.Articles, categories: categories})
            }); //to render the articles by the category
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log("the server's port is " + port)
});