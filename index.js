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

// // Define your models
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

// // Sync database
// sequelize.sync().then(() => console.log('Database synced')).catch(err => console.log('Error: ' + err));

// // Define your routes
// app.get('/api/service-types', async (req, res) => {
//   try {
//     const serviceTypes = await ServiceCode.findAll({
//       attributes: ['code'],
//       group: ['code']
//     });
//     res.json(serviceTypes.map(item => item.code));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/api/event-triggers', async (req, res) => {
//   try {
//     const eventTriggers = await ParamMapping.findAll({
//       attributes: ['event_name'],
//       group: ['event_name']
//     });
//     res.json(eventTriggers.map(item => item.event_name));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/api/parties', async (req, res) => {
//   try {
//     const parties = await ParamMapping.findAll({
//       attributes: ['party_type'],
//       group: ['party_type']
//     });
//     res.json(parties.map(item => item.party_type));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route to fetch parameters
// app.get('/api/parameters', async (req, res) => {
//   try {
//     const parameters = await ParamMapping.findAll({
//       attributes: ['param_name'],
//       group: ['param_name']
//     });
//     res.json(parameters.map(item => item.param_name));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const bodyParser = require('body-parser');  // You may switch to express.json() if bodyParser is deprecated
// const cors = require('cors');
// const { Sequelize, DataTypes } = require('sequelize');
// const notificationRoutes = require('./routes/notifications'); // Make sure the path is correct based on your project structure

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
// sequelize.sync().then(() => console.log('Database synced')).catch(err => console.log('Error: ' + err));

// // Define routes for existing endpoints
// app.get('/api/service-types', async (req, res) => {
//   try {
//     const serviceTypes = await ServiceCode.findAll({
//       attributes: ['code'],
//       group: ['code']
//     });
//     res.json(serviceTypes.map(item => item.code));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/api/event-triggers', async (req, res) => {
//   try {
//     const eventTriggers = await ParamMapping.findAll({
//       attributes: ['event_name'],
//       group: ['event_name']
//     });
//     res.json(eventTriggers.map(item => item.event_name));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/api/parties', async (req, res) => {
//   try {
//     const parties = await ParamMapping.findAll({
//       attributes: ['party_type'],
//       group: ['party_type']
//     });
//     res.json(parties.map(item => item.party_type));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/api/parameters', async (req, res) => {
//   try {
//     const parameters = await ParamMapping.findAll({
//       attributes: ['param_name'],
//       group: ['param_name']
//     });
//     res.json(parameters.map(item => item.param_name));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const parsedTemplates = templates.map(template => {
//       const parts = template.name.split('.');
//       return {
//         serviceType: parts[0],
//         eventTrigger: parts.slice(1, -1).join('.'),
//         party: parts.slice(-1).join(''),
//         createdOn: template.created_on
//       };
//     });
//     res.json(parsedTemplates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // Include notification routes
// app.use('/api/notifications', notificationRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



//new------------------------------------------



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Sequelize, DataTypes } = require('sequelize');
// const notificationRoutes = require('./routes/notifications'); // Make sure the path is correct based on your project structure

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

// // API to fetch parsed notifications
// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const parsedTemplates = templates.map(template => {
//       const parts = template.name.split('.');
//       return {
//         serviceType: parts[0],
//         eventTrigger: parts.slice(1, -1).join('.'),
//         party: parts.slice(-1).join(''),
//         createdOn: template.created_on
//       };
//     });
//     res.json(parsedTemplates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Include notification routes
// app.use('/api/notifications', notificationRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//new2------------------------------------

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



//new3---------------------------------------

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

// GET all notification templates
app.get('/api/notification-templates', async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll();
    const formattedTemplates = templates.map(template => {
      const parts = template.name.split('.');
      return {
        id: template.id,
        serviceType: parts[0],
        eventTrigger: parts[1] + '.' + parts[2],
        party: parts[3],
        createdOn: template.created_on
      };
    });
    res.json(formattedTemplates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
