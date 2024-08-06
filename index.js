//new3---------------------------------------

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

// // GET all notification templates
// // app.get('/api/notification-templates', async (req, res) => {
// //   try {
// //     const templates = await NotificationTemplate.findAll();
// //     const formattedTemplates = templates.map(template => {
// //       const parts = template.name.split('.');
// //       return {
// //         id: template.id,
// //         serviceType: parts[0],
// //         eventTrigger: parts[1] + '.' + parts[2],
// //         party: parts[3],
// //         createdOn: template.created_on
// //       };
// //     });
// //     res.json(formattedTemplates);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// //new 

// // app.get('/api/notification-templates', async (req, res) => {
// //   try {
// //     const templates = await NotificationTemplate.findAll();
// //     const formattedTemplates = templates.map(template => {
// //       const parts = template.name.split('.');

// //       const serviceType = parts.shift(); // Remove and get the first element
// //       const party = parts.pop(); // Remove and get the last element
// //       const eventTrigger = parts.join('.'); // Join the remaining elements

// //       return {
// //         id: template.id,
// //         serviceType: serviceType || 'N/A', // Default if empty
// //         eventTrigger: eventTrigger || 'N/A', // Default if empty
// //         party: party || 'N/A', // Default if empty
// //         createdOn: template.created_on
// //       };
// //     });
// //     res.json(formattedTemplates);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// //new2

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     // Fetch all templates
//     const templates = await NotificationTemplate.findAll();

//     // Fetch auxiliary data from other tables
//     const serviceTypes = await ServiceCode.findAll({
//       attributes: ['code']
//     });

//     const paramMappings = await ParamMapping.findAll({
//       attributes: ['event_name', 'party_type']
//     });

//     // Map the templates to include the additional data
//     const formattedTemplates = templates.map(template => {
//       // Assuming you can associate template with serviceTypes and paramMappings somehow:
//       const serviceType = serviceTypes.find(st => st.id === template.serviceTypeId)?.code || 'N/A';
//       const eventMapping = paramMappings.find(pm => pm.id === template.paramMappingId) || {};

//       return {
//         id: template.id,
//         serviceType: serviceType,
//         eventTrigger: eventMapping.event_name || 'N/A',
//         party: eventMapping.party_type || 'N/A',
//         createdOn: template.created_on
//       };
//     });

//     res.json(formattedTemplates);
//   } catch (error) {
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


//new------------------------------------------------------

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
  }
}, {
  timestamps: false,
  tableName: 'notification_template'
});

// Sync database
sequelize.sync().catch(err => console.log('Error: ' + err));

// Define routes for existing endpoints
// app.get('/api/service-types', async (req, res) => {
//   const serviceTypes = await ServiceCode.findAll({
//     attributes: ['code'],
//     group: ['code']
//   });
//   res.json(serviceTypes.map(item => item.code));
// });

//new service type

app.get('/api/service-types', async (req, res) => {
  try {
    const serviceTypes = await ServiceCode.findAll();
    res.json(serviceTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const formattedTemplates = templates.map(template => {
//       const parts = template.name.split('.');

//       const serviceType = parts.shift(); // Remove and get the first element
//       const party = parts.pop(); // Remove and get the last element
//       const eventTrigger = parts.join('.'); // Join the remaining elements

//       return {
//         id: template.id,
//         serviceType: serviceType || 'N/A', // Default if empty
//         eventTrigger: eventTrigger || 'N/A', // Default if empty
//         party: party || 'N/A', // Default if empty
//         createdOn: template.created_on
//       };
//     });
//     res.json(formattedTemplates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//new----------

app.get('/api/notification-templates', async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll();
    console.log('Templates:', templates);  // Debug: log raw template data

    const formattedTemplates = templates.map(template => {
      const parts = template.name.split('.');
      const serviceType = parts.shift() || 'N/A';  // Ensure there's a fallback if empty

      let party = parts.pop() || 'N/A';  // Ensure there's a fallback if empty
      let eventTrigger = parts.join('.') || 'N/A';  // Ensure there's a fallback if empty

      // Handle case where 'party' might be a number or a single character
      if (party.match(/^[0-9a-zA-Z]$/)) {
        party = parts.pop() || 'N/A';  // Take the next-to-last part as party
        eventTrigger = parts.join('.') || 'N/A';  // Adjust the event trigger
      }

      return {
        id: template.id,
        serviceType: serviceType,
        eventTrigger: eventTrigger,
        party: party,
        createdOn: template.created_on
      };
    });

    console.log('Formatted Templates:', formattedTemplates);  // Debug: log processed data
    res.json(formattedTemplates);
  } catch (error) {
    console.error('Error fetching notification templates:', error);
    res.status(500).json({ message: error.message });
  }
});


//new2

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     // Fetch all templates
//     const templates = await NotificationTemplate.findAll();

//     // Fetch auxiliary data from other tables
//     const serviceTypes = await ServiceCode.findAll({
//       attributes: ['code']
//     });

//     const paramMappings = await ParamMapping.findAll({
//       attributes: ['event_name', 'party_type']
//     });

//     // Map the templates to include the additional data
//     const formattedTemplates = templates.map(template => {
//       // Assuming you can associate template with serviceTypes and paramMappings somehow:
//       const serviceType = serviceTypes.find(st => st.id === template.serviceTypeId)?.code || 'N/A';
//       const eventMapping = paramMappings.find(pm => pm.id === template.paramMappingId) || {};

//       return {
//         id: template.id,
//         serviceType: serviceType,
//         eventTrigger: eventMapping.event_name || 'N/A',
//         party: eventMapping.party_type || 'N/A',
//         createdOn: template.created_on
//       };
//     });

//     res.json(formattedTemplates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// POST route to add a new notification template
app.post('/api/notification-templates', async (req, res) => {
  try {
    const { serviceType, eventTrigger, party, createdOn } = req.body;
    const name = `${serviceType}.${eventTrigger}.${party}`;
    const newTemplate = await NotificationTemplate.create({
      name,
      created_on: new Date(createdOn) // assuming createdOn is passed in ISO format
    });
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Include notification routes
app.use('/api/notifications', require('./routes/notifications'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
