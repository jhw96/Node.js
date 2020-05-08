'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    let datas = [];
    for(let i = 0; i < 10; i++){
      let obj = {
        email: "test" + i + "@example.com",
        name: "testUser" + i,
        password: "1234",
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(obj)
    }
    //bulkInsert 메서드를 통해 첫번째 인자의 테이블에 데이터 삽입 
    return queryInterface.bulkInsert('users', datas, {});
  },

  down: (queryInterface, Sequelize) => {
   //bulkDelte 메서드를 통해 첫번째 인자의 테이블 데이터 되돌리기
    return queryInterface.bulkDelete('users', null, {});
  }
};
// sequelize 명령어를 통해 up , undo를 통해 down 코드 실행