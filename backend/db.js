const sequelize = require('sequelize');
const  Sequelize  = require('sequelize');

async function connectiondb(){
    const sequelize = new Sequelize('todolist', 'postgres', 'postgres', {
        dialect: 'postgres'
    })
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


connectiondb()

