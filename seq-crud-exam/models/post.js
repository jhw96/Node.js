'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

// associate 프로퍼티를 함수로 정의하면, models의 index.js에서 post 모델에 대한 관계를 알 수 있게 된다. hasMany 메서드를 호출해 post는 많은 reply를 갖도록 한다.
  post.associate = function (models) {
    post.hasMany(models.reply);
  };

  return post;
};