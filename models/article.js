"use strict";
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      title: DataTypes.STRING,
      attachment: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tags: {
        type: DataTypes.STRING,
        set(value) {
          return this.setDataValue("tags", value.toString());
        },
        get() {
          const data = this.getDataValue("tags");
          return data && data.split(",");
        }
      }
    },
    {}
  );
  Article.associate = function(models) {
    Article.belongsTo(models.user);
  };
  return Article;
};
