const app = require('express');
const router = app.Router();

router.get('/categories', (req, res) => {
    res.send('testing categorie route!')
});

module.exports = router;
/*to use the route /categories in index.js or in any other file, 
we have to export the variable 'router' */ 

//https://expressjs.com/en/4x/api.html#router docs about this 