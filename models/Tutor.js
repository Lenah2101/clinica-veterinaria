const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tutor = sequelize.define('Tutor', {
  nome: DataTypes.STRING,
  telefone: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  tableName: 'tutores',
  timestamps: false
});

module.exports = Tutor;