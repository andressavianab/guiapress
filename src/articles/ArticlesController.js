const app = require('express');
const router = app.Router();

router.get('/articles', (req, res) => {
    res.send("article route");
});

router.get('/admin/articles/new', (req, res) => {
    res.send('route to create a new article');
});

module.exports = router;