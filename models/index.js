const Tutor = require('./Tutor');
const Animal = require('./Animal');
const Consulta = require('./Consulta');

Tutor.hasMany(Animal, { foreignKey: 'tutor_id' });
Animal.belongsTo(Tutor, { foreignKey: 'tutor_id' });

Animal.hasMany(Consulta, { foreignKey: 'animal_id' });
Consulta.belongsTo(Animal, { foreignKey: 'animal_id' });

module.exports = {
  Tutor,
  Animal,
  Consulta
};