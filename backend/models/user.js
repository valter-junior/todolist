'use strict';
/** const Notes = require('./notes')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
    static associate(models) {
      // define association here
      User.hasMany(Notes, {
        foreignKey: 'user_id',
        as: 'notes'
      })
    }
  }; 
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
}; */
const { Sequelize } = require('sequelize');
const Notes = require('./notes');
const sequelize = new Sequelize('todolist', 'root', 'root', {
  dialect: 'postgres'
})


const User = sequelize.define('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  
});


module.exports = User;