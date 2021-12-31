const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('todo', {
    todo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "todo_firstname_key"
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "todo_login_key"
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "todo_password_key"
    }
  }, {
    sequelize,
    tableName: 'todo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "todo_firstname_key",
        unique: true,
        fields: [
          { name: "firstname" },
        ]
      },
      {
        name: "todo_login_key",
        unique: true,
        fields: [
          { name: "login" },
        ]
      },
      {
        name: "todo_password_key",
        unique: true,
        fields: [
          { name: "password" },
        ]
      },
      {
        name: "todo_pkey",
        unique: true,
        fields: [
          { name: "todo_id" },
        ]
      },
    ]
  });
};
