const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Sequelize to connect to PostgreSQL
const sequelize = new Sequelize('edb', 'azamp_target', 'azamp_target', {
  host: '127.0.0.1',
  port: 5435,
  dialect: 'postgres'
});

// Define your models
const ParamMapping = sequelize.define('param_mapping_list', {
  service_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  party_type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'param_mapping_list'
});

// Sync database
sequelize.sync().then(() => console.log('Database synced')).catch(err => console.log('Error: ' + err));

// Define your routes
app.get('/api/service-types', async (req, res) => {
  try {
    const serviceTypes = await ParamMapping.findAll({
      attributes: ['service_code'],
      group: ['service_code']
    });
    res.json(serviceTypes.map(item => item.service_code));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/event-triggers', async (req, res) => {
  try {
    const eventTriggers = await ParamMapping.findAll({
      attributes: ['event_name'],
      group: ['event_name']
    });
    res.json(eventTriggers.map(item => item.event_name));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/parties', async (req, res) => {
  try {
    const parties = await ParamMapping.findAll({
      attributes: ['party_type'],
      group: ['party_type']
    });
    res.json(parties.map(item => item.party_type));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
