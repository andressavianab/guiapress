const app = require("express");
const router = app.Router();
const Category = require("../categories/categoryModel");
const Article = require("./articleModel");
const slug = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/articles", (req, res) => {
  try {
    Article.findAll({
      include: [{ model: Category }], //Including category data by table relationship (association)
    }).then((articles) => {
      res.json({ Articles: articles, Category: Category });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/articles/save", (req, res) => {
  try {
    const { title, body, categoryId } = req.body;

    if (!title || !body || !categoryId) {
      res
        .status(400)
        .send({ message: "Please submit all fields to create the article" });
    } else {
      Article.create({
        title: title,
        body: body,
        CategoryId: categoryId,
        slug: slug(title),
      }).then(() => {
        res.status(200).send({ message: "Article created succesfully" });
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete("/articles/delet/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).send({ message: "Please send a numerical parameter" });
    }

    Article.findByPk(id).then((article) => {
      if (article === null) {
        res.status(404).send({ message: "Article not found" });
      } else {
        Article.destroy({
          where: {
            id: id,
          },
        }).then(res.status(200).send({ message: "Article deleted" }));
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/articles/edit/:id", (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.status(400).send({ message: "Please send a numerical parameter" });
    }

    Article.findByPk(id).then((article) => {
      if (article === null) {
        res.status(404).send({ message: "Article not found" });
      } else if (article != undefined) {
        const { title, body, categoryId } = req.body;

        if (title != undefined) {
          article.title = title;
        }

        if (body != undefined) {
          article.body = body;
        }

        if (categoryId != undefined) {
          article.CategoryId = categoryId;
        }

        Article.update(
          {
            title: title,
            body: body,
            CategoryId: categoryId,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).send({ message: "Updated article" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
