'use strict';
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('test', {
    postName: {
        type: DataTypes.STRING,
    },
    postWriter: {
        type: DataTypes.STRING,
    }
  });
  return test;
};