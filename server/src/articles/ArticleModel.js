const { DataTypes } = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/categoryModel');

const Article = connection.define('Articles', {
    title: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article);
Article.belongsTo(Category);

/* it is important to choose each type of standard associations.
in that case, choosing the one-to-many is the best way. the docs help with this https://sequelize.org/docs/v6/core-concepts/assocs/

another important choice is to define in which model file this association
configuration is done. I tried to configure in the 'category Model' file, but the 
'foreign key' was not appearing in the database. 
I don't know why this happens
*/

Article.sync({ force: false }); 
module.exports = Article;