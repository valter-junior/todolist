const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todolist', 'postgres', 'postgres', {
  dialect: 'postgres'
})

const Notes =  sequelize.define('list', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(256),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'list',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "list_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});

module.exports = Notes;