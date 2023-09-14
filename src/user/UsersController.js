const app = require("express");
const router = app.Router();
const User = require('./userModel');
const bcrypt = require('bcrypt');


router.get("/admin/users", (req, res) => {
    res.send("hi");
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/save", (req, res) => {
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
                    res.redirect("/admin/users/create");
                });
            });
        } else {
            res.redirect("/admin/users/create");
        }
    });
});

module.exports = router;
