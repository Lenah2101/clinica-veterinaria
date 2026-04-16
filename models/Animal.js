const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Animal = sequelize.define('Animal', {
  nome: DataTypes.STRING,
  especie: DataTypes.STRING,
  raca: DataTypes.STRING,
  data_nascimento: DataTypes.DATEONLY,
  tutor_id: DataTypes.INTEGER
}, {
  tableName: 'animais',
  timestamps: false
});

module.exports = Animal; 