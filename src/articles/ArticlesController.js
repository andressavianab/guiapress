const app = require('express');
const router = app.Router();
const Category = require('../categories/categoryModel');
const Article = require('./articleModel');
const slug = require('slugify');

router.get('/admin/articles', (req, res) => {
    res.send("article route");
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories});
    })
});

router.post('/articles/save', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const categoryId = req.body.categoryId

    // this validation isnt working ill fix this later =D
    if (title != undefined && body != undefined && body != null) {
        Article.create(
            {
                title: title,
                body: body,
                CategoryId: categoryId,
                slug: slug(title)
            }
        ).then(res.redirect('/admin/articles'));
    } else {
        res.redirect('/admin/articles');
    }
})

module.exports = router;