const app = require('express');
const router = app.Router();

router.get('/articles', (req, res) => {
    res.send("article route");
});

router.get('/admin/articles/new', (req, res) => {
    res.render('admin/articles/new');
});

module.exports = router;