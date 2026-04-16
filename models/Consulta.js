const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consulta = sequelize.define('Consulta', {
  animal_id: DataTypes.INTEGER,
  data_consulta: DataTypes.DATE,
  motivo: DataTypes.TEXT,
  diagnostico: DataTypes.TEXT,
  veterinario: DataTypes.STRING
}, {
  tableName: 'consultas',
  timestamps: false
});

module.exports = Consulta;