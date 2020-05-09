"use strict";
module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define(
    "consultation",
    {
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      bornDate: DataTypes.STRING,
      age: DataTypes.STRING,
      height: DataTypes.STRING,
      weight: DataTypes.STRING,
      gender: DataTypes.STRING,
      subject: DataTypes.STRING,
      liveConsul: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Consultation.associate = function(models) {
    Consultation.belongsTo(models.user);
    Consultation.hasOne(models.reply);
  };
  return Consultation;
};
