const app = require("express");
const router = app.Router();
const Category = require("./categoryModel");
const slug = require("slugify");
const adminAuth = require("../middlewares/adminAuth");
const { where } = require("sequelize");

router.get("/categories", (req, res) => {
  try {
    Category.findAll().then((categories) => {
      res.status(200).json({ Categories: categories });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/categories/save", (req, res) => {
  var title = req.body.title;

  if (!title) {
    res.status(400).send({ message: "Please send the Category field" });
  } else {
    Category.create({
      title: title,
      slug: slug(title),
    }).then(() => {
      res.status(200).send({ message: "Category created successfully" });
    });
  }
});

router.delete("/categories/delete/:id", (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).send({ message: "Please send a numerical parameter" });
    }

    Category.findByPk(id).then((category) => {
      if (category === null) {
        res.status(404).send({ message: "Category not found" });
      } else {
        Category.destroy({
          where: {
            id: id,
          },
        }).then(() => {
          res.status(200).send({ message: "Category deleted" });
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/categories/edit/:id", (req, res) => {
  try {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).send({ message: "Please send a numerical parameter" });
    }

    Category.findByPk(id).then((category) => {
      if (category === null) {
        res.status(404).send({ message: "Category not found" });
      } else {
        var title = req.body.title;

        if (title != undefined) {
          category.title = title;
        }

        Category.update(
          {
            title: title,
            slug: slug(title),
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).send({ message: "Updated category" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
/* to use the route /categories in index.js or in any other file, 
we have to export the variable 'router' */

//https://expressjs.com/en/4x/api.html#router docs about this
