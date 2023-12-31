const app = require("express");
const router = app.Router();
const User = require('./userModel');
const bcrypt = require('bcrypt');
const adminAuth = require('../middlewares/adminAuth');


router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then((users) => {
        res.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/new", adminAuth, (req, res) => {
    res.render("admin/users/new");
});

router.post("/users/save", adminAuth, (req, res) => {
    const saltRounds = 10;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user == undefined) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                User.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect("/admin/users/new");
                });
            });
        } else {
            res.redirect("/admin/users/new");
        }
    });
});

router.get('/admin/login', (req, res) => {
    res.render("admin/users/login");
});

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined) {
            var correct = bcrypt.compareSync(password, user.password);
            
            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            } else {
                res.redirect('/admin/login');
            }

        } else {
            res.redirect('/admin/login');
        }
    });
});

router.get('logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
