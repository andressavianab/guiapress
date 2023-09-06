const app = require('express');
const router = app.Router();
const Category = require('../categories/categoryModel');
const Article = require('./articleModel');
const slug = require('slugify');

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [
            {model: Category}
        ]  //Including category data by table relationship (association)
    }).then(articles => {   
        res.render("admin/articles/index", {articles: articles}); 
    });
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories});
    });
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
});

router.post('/articles/delet', (req, res) => {
    const id = req.body.id

    Article.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(res.redirect('/admin/articles'));
});

router.get('/articles/edit/:id', (req, res) => {
    var id = req.params.id;

    if(isNaN(id)) {
        res.redirect("/admin/articles");
    };

    Article.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('./admin/articles/edit', {categories: categories, article: article})
            })
        } else {
            res.redirect('/admin/article');
        }
    });

});

router.post('/articles/update', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const id = req.body.id;

    Article.update(
        {
            title: title,
            body: body
        }, {
            where: {
                id: id
            }
        }
    ).then(res.redirect('/admin/articles'))
})

module.exports = router;