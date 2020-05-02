'use strict';
module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('reply', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
    
    
// 게시글과 관련된 연관 관계를 매핑, belongsTo 메서드를 통해 reply가 하나의 post에 포함되게 해줌
reply.associate = function(models){
    reply.belongsTo(models.post, {
        foreignKey: "postId"
    })
};
    
  return reply;
};