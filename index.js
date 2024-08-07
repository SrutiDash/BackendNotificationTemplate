
// //new------------------------------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Sequelize, DataTypes } = require('sequelize');

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Initialize Sequelize to connect to PostgreSQL
// const sequelize = new Sequelize('edb', 'azamp_target', 'azamp_target', {
//   host: '127.0.0.1',
//   port: 5435,
//   dialect: 'postgres'
// });

// // Define models
// const ParamMapping = sequelize.define('param_mapping_list', {
//   event_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   party_type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   param_name: {
//     type: DataTypes.STRING,
//     allowNull: true
//   }
// }, {
//   timestamps: false,
//   tableName: 'param_mapping_list'
// });

// const ServiceCode = sequelize.define('service_code', {
//   code: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   timestamps: false,
//   tableName: 'service_code'
// });

// const NotificationTemplate = sequelize.define('notification_template', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   created_on: {
//     type: DataTypes.DATE,
//     allowNull: false
//   }
// }, {
//   timestamps: false,
//   tableName: 'notification_template'
// });

// // Sync database
// sequelize.sync().catch(err => console.log('Error: ' + err));

// // Define routes for existing endpoints
// app.get('/api/service-types', async (req, res) => {
//   const serviceTypes = await ServiceCode.findAll({
//     attributes: ['code'],
//     group: ['code']
//   });
//   res.json(serviceTypes.map(item => item.code));
// });

// app.get('/api/event-triggers', async (req, res) => {
//   const eventTriggers = await ParamMapping.findAll({
//     attributes: ['event_name'],
//     group: ['event_name']
//   });
//   res.json(eventTriggers.map(item => item.event_name));
// });

// app.get('/api/parties', async (req, res) => {
//   const parties = await ParamMapping.findAll({
//     attributes: ['party_type'],
//     group: ['party_type']
//   });
//   res.json(parties.map(item => item.party_type));
// });

// app.get('/api/parameters', async (req, res) => {
//   const parameters = await ParamMapping.findAll({
//     attributes: ['param_name'],
//     group: ['param_name']
//   });
//   res.json(parameters.map(item => item.param_name));
// });

// //new----------

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     console.log('Templates:', templates);  // Debug: log raw template data

//     const formattedTemplates = templates.map(template => {
//       const parts = template.name.split('.');
//       const serviceType = parts.shift() || 'N/A';  // Ensure there's a fallback if empty

//       let party = parts.pop() || 'N/A';  // Ensure there's a fallback if empty
//       let eventTrigger = parts.join('.') || 'N/A';  // Ensure there's a fallback if empty

//       // Handle case where 'party' might be a number or a single character
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop() || 'N/A';  // Take the next-to-last part as party
//         eventTrigger = parts.join('.') || 'N/A';  // Adjust the event trigger
//       }

//       return {
//         id: template.id,
//         serviceType: serviceType,
//         eventTrigger: eventTrigger,
//         party: party,
//         createdOn: template.created_on
//       };
//     });

//     console.log('Formatted Templates:', formattedTemplates);  // Debug: log processed data
//     res.json(formattedTemplates);
//   } catch (error) {
//     console.error('Error fetching notification templates:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // POST route to add a new notification template
// app.post('/api/notification-templates', async (req, res) => {
//   try {
//     const { serviceType, eventTrigger, party, createdOn } = req.body;
//     const name = `${serviceType}.${eventTrigger}.${party}`;
//     const newTemplate = await NotificationTemplate.create({
//       name,
//       created_on: new Date(createdOn) // assuming createdOn is passed in ISO format
//     });
//     res.status(201).json(newTemplate);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Include notification routes
// app.use('/api/notifications', require('./routes/notifications'));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//new2------------------------------------------------



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

// Define models
const ParamMapping = sequelize.define('param_mapping_list', {
  event_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  party_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  param_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'param_mapping_list'
});

const ServiceCode = sequelize.define('service_code', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'service_code'
});

const NotificationTemplate = sequelize.define('notification_template', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: false
  },
  default_channel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  template_definition: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'notification_template'
});

// Sync database
sequelize.sync().catch(err => console.log('Error: ' + err));

// Define routes for existing endpoints
app.get('/api/service-types', async (req, res) => {
  const serviceTypes = await ServiceCode.findAll({
    attributes: ['code'],
    group: ['code']
  });
  res.json(serviceTypes.map(item => item.code));
});

app.get('/api/event-triggers', async (req, res) => {
  const eventTriggers = await ParamMapping.findAll({
    attributes: ['event_name'],
    group: ['event_name']
  });
  res.json(eventTriggers.map(item => item.event_name));
});

app.get('/api/parties', async (req, res) => {
  const parties = await ParamMapping.findAll({
    attributes: ['party_type'],
    group: ['party_type']
  });
  res.json(parties.map(item => item.party_type));
});

app.get('/api/parameters', async (req, res) => {
  const parameters = await ParamMapping.findAll({
    attributes: ['param_name'],
    group: ['param_name']
  });
  res.json(parameters.map(item => item.param_name));
});

app.get('/api/notification-templates', async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll();
    const formattedTemplates = templates.map(template => {
      const parts = template.name.split('.');
      const serviceType = parts.shift() || 'N/A';
      let party = parts.pop() || 'N/A';
      let eventTrigger = parts.join('.') || 'N/A';
      if (party.match(/^[0-9a-zA-Z]$/)) {
        party = parts.pop() || 'N/A';
        eventTrigger = parts.join('.') || 'N/A';
      }
      return {
        id: template.id,
        serviceType: serviceType,
        eventTrigger: eventTrigger,
        party: party,
        createdOn: template.created_on
      };
    });
    res.json(formattedTemplates);
  } catch (error) {
    console.error('Error fetching notification templates:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/notification-templates/:id', async (req, res) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    const parts = template.name.split('.');
    const serviceType = parts.shift() || 'N/A';
    let party = parts.pop() || 'N/A';
    let eventTrigger = parts.join('.') || 'N/A';
    if (party.match(/^[0-9a-zA-Z]$/)) {
      party = parts.pop() || 'N/A';
      eventTrigger = parts.join('.') || 'N/A';
    }
    const defaultChannel = template.default_channel;
    const templateDefinition = JSON.parse(template.template_definition);
    const notificationDetails = {
      id: template.id,
      serviceType,
      eventTrigger,
      party,
      createdOn: template.created_on,
      channel: defaultChannel,
      languages: templateDefinition.map(td => ({
        language: td.messageDetails.definition.map(def => def.language),
        header: eventTrigger,
        messageBody: td.messageDetails.definition.map(def => def.text)
      }))
    };
    res.json(notificationDetails);
  } catch (error) {
    console.error('Error fetching notification template:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
