const { Sequelize } = require('sequelize');

// PostgreSQL configuration
const sequelize = new Sequelize('edb', 'azamp_target', 'azamp_target', {
  host: '127.0.0.1',
  port: 5435,
  dialect: 'postgres'
});

module.exports = sequelize;
