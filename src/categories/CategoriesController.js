const app = require('express');
const router = app.Router();
const Category = require('./categoryModel');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new.ejs');
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title, 
            slug: slugify(title)
        }).then(() => {
            res.redirect('/');
        })
    } else {
        res.render('./admin/categories/new')
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render('./admin/categories/index', {categories: categories})
    });  // function to consume the category data from the frontend
});  

module.exports = router;
/* to use the route /categories in index.js or in any other file, 
we have to export the variable 'router' */ 

//https://expressjs.com/en/4x/api.html#router docs about this 