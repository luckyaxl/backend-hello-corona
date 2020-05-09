"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    "reply",
    {
      reply: DataTypes.STRING,
      consultationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Reply.associate = function(models) {
    Reply.belongsTo(models.consultation);
    Reply.belongsTo(models.user);
  };
  return Reply;
};