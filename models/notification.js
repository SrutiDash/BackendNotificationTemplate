// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const Notification = sequelize.define('Notification', {
//   serviceType: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   eventTrigger: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   party: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   createdOn: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   },
//   createdBy: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   timestamps: true,
//   tableName: 'notifications'
// });

// module.exports = Notification;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path as needed

const Notification = sequelize.define('Notification', {
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventTrigger: {
    type: DataTypes.STRING,
    allowNull: false
  },
  party: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdOn: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'notifications'
});

module.exports = Notification;
