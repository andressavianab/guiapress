const app = require('express');
const router = app.Router();

router.get('/categories', (req, res) => {
    res.send('testing categorie route!');
});

router.get('/admin/categories/new', (req, res) => {
    res.send('route to create a new categorie');
});

module.exports = router;
/*to use the route /categories in index.js or in any other file, 
we have to export the variable 'router' */ 

//https://expressjs.com/en/4x/api.html#router docs about this 