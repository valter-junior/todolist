const { Sequelize } = require('sequelize');

async function connectiondb(){
    const sequelize = new Sequelize('postgres://postgres:postgres:5432/todolist')
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}




module.exports = connectiondb.sequelize

