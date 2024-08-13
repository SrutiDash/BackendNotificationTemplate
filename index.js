//new2------------------------------------------------



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
//   },
//   default_channel: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   template_definition: {
//     type: DataTypes.TEXT,
//     allowNull: true
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

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const formattedTemplates = templates.map(template => {
//       const parts = template.name.split('.');
//       const serviceType = parts.shift() || 'N/A';
//       let party = parts.pop() || 'N/A';
//       let eventTrigger = parts.join('.') || 'N/A';
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop() || 'N/A';
//         eventTrigger = parts.join('.') || 'N/A';
//       }
//       return {
//         id: template.id,
//         serviceType: serviceType,
//         eventTrigger: eventTrigger,
//         party: party,
//         createdOn: template.created_on
//       };
//     });
//     res.json(formattedTemplates);
//   } catch (error) {
//     console.error('Error fetching notification templates:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/api/notification-templates/:id', async (req, res) => {
//   try {
//     const template = await NotificationTemplate.findByPk(req.params.id);
//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }
//     const parts = template.name.split('.');
//     const serviceType = parts.shift() || 'N/A';
//     let party = parts.pop() || 'N/A';
//     let eventTrigger = parts.join('.') || 'N/A';
//     if (party.match(/^[0-9a-zA-Z]$/)) {
//       party = parts.pop() || 'N/A';
//       eventTrigger = parts.join('.') || 'N/A';
//     }
//     const defaultChannel = template.default_channel;
//     const templateDefinition = JSON.parse(template.template_definition);
//     const notificationDetails = {
//       id: template.id,
//       serviceType,
//       eventTrigger,
//       party,
//       createdOn: template.created_on,
//       channel: defaultChannel,
//       languages: templateDefinition.map(td => ({
//         language: td.messageDetails.definition.map(def => def.language),
//         header: eventTrigger,
//         messageBody: td.messageDetails.definition.map(def => def.text)
//       }))
//     };
//     res.json(notificationDetails);
//   } catch (error) {
//     console.error('Error fetching notification template:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//new3------------------------------------



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

// //----------------------------------------------------------

// // Initialize Sequelize to connect to PostgreSQL

// // const sequelize = new Sequelize('dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com', 'K8S_PE_ENV_PARTY', 'Payx07', {
// //   host: '127.0.0.1',
// //   port: 1525,
// //   dialect: 'oracle'
// // });

// // const sequelize = new Sequelize('dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com', 'K8S_PE_ENV_PARTY', 'Payx07', {
// //   host: '127.0.0.1',
// //   port: 1525,
// //   dialect: 'oracle',
// //   dialectOptions: {
// //     // connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'
// //     connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'

// //   }
// // });


// //----------------------------------------------------------

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
//   },
//   default_channel: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   template_definition: {
//     type: DataTypes.TEXT,
//     allowNull: true
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

// app.get('/api/notification-templates', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const formattedTemplates = templates.map(template => {
//       const parts = template.name.split('.');
//       const serviceType = parts.shift() || 'N/A';
//       let party = parts.pop() || 'N/A';
//       let eventTrigger = parts.join('.') || 'N/A';
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop() || 'N/A';
//         eventTrigger = parts.join('.') || 'N/A';
//       }
//       return {
//         id: template.id,
//         serviceType: serviceType,
//         eventTrigger: eventTrigger,
//         party: party,
//         createdOn: template.created_on
//       };
//     });
//     res.json(formattedTemplates);
//   } catch (error) {
//     console.error('Error fetching notification templates:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // app.get('/api/notification-templates/:id', async (req, res) => {
// //   try {
// //     const template = await NotificationTemplate.findByPk(req.params.id);
// //     if (!template) {
// //       return res.status(404).json({ message: 'Template not found' });
// //     }
// //     const parts = template.name.split('.');
// //     const serviceType = parts.shift() || 'N/A';
// //     let party = parts.pop() || 'N/A';
// //     let eventTrigger = parts.join('.') || 'N/A';
// //     if (party.match(/^[0-9a-zA-Z]$/)) {
// //       party = parts.pop() || 'N/A';
// //       eventTrigger = parts.join('.') || 'N/A';
// //     }
// //     const defaultChannel = template.default_channel;
// //     const templateDefinition = JSON.parse(template.template_definition);
// //     const notificationDetails = {
// //       id: template.id,
// //       serviceType,
// //       eventTrigger,
// //       party,
// //       createdOn: template.created_on,
// //       channel: defaultChannel,
// //       languages: templateDefinition.map(td => ({
// //         language: td.messageDetails.definition.map(def => def.language),
// //         header: eventTrigger,
// //         messageBody: td.messageDetails.definition.map(def => def.text)
// //       }))
// //     };
// //     res.json(notificationDetails);
// //   } catch (error) {
// //     console.error('Error fetching notification template:', error);
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // app.get('/api/notification-templates/:id', async (req, res) => {
// //   try {
// //     const template = await NotificationTemplate.findByPk(req.params.id);
// //     if (!template) {
// //       return res.status(404).json({ message: 'Template not found' });
// //     }

// //     const parts = template.name.split('.');
// //     const serviceType = parts.shift() || 'N/A';
// //     let party = parts.pop() || 'N/A';
// //     let eventTrigger = parts.join('.') || 'N/A';

// //     // Adjust for single character or number party entries
// //     if (party.match(/^[0-9a-zA-Z]$/)) {
// //       party = parts.pop() || 'N/A';
// //       eventTrigger = parts.join('.') || 'N/A';
// //     }

// //     const defaultChannel = template.default_channel; // Assumes default_channel is directly stored
// //     const templateDefinition = JSON.parse(template.template_definition);

// //     const languages = templateDefinition.map(def => {
// //       return {
// //         language: def.notificationDetails.basedOn, // Assuming this is how language is stored
// //         header: eventTrigger, // You can adjust as needed
// //         messageBody: def.messageDetails.definition.map(d => d.text)
// //       };
// //     });

// //     const notificationDetails = {
// //       id: template.id,
// //       serviceType,
// //       eventTrigger,
// //       party,
// //       createdOn: template.created_on,
// //       channel: defaultChannel,
// //       languages
// //     };

// //     res.json(notificationDetails);
// //   } catch (error) {
// //     console.error('Error fetching notification template:', error);
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// app.get('/api/notification-templates/:id', async (req, res) => {
//   try {
//     const template = await NotificationTemplate.findByPk(req.params.id);
//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     const parts = template.name.split('.');
//     const serviceType = parts.shift() || 'N/A';
//     let party = parts.pop() || 'N/A';
//     let eventTrigger = parts.join('.') || 'N/A';

//     if (party.match(/^[0-9a-zA-Z]$/)) {
//       party = parts.pop() || 'N/A';
//       eventTrigger = parts.join('.') || 'N/A';
//     }

//     const defaultChannel = template.default_channel;
//     if (template.template_definition) {
//       const templateDefinition = JSON.parse(template.template_definition);
//       console.log('Parsed Template Definition:', templateDefinition); // Debugging log

//       const languages = templateDefinition.map(def => {
//         return {
//           language: def.notificationDetails.basedOn, // Ensure this is correctly referencing the language field
//           header: eventTrigger, // You can adjust as needed
//           messageBody: def.messageDetails.definition.map(d => d.text)
//         };
//       });

//       const notificationDetails = {
//         id: template.id,
//         serviceType,
//         eventTrigger,
//         party,
//         createdOn: template.created_on,
//         channel: defaultChannel,
//         languages
//       };

//       res.json(notificationDetails);
//     } else {
//       res.status(404).json({ message: 'Template definition not found or malformed JSON' });
//     }
//   } catch (error) {
//     console.error('Error fetching notification template:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



////////////////new4////////////////




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

//----------------------------------------------------------

// Initialize Sequelize to connect to PostgreSQL

// const sequelize = new Sequelize('dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com', 'K8S_PE_ENV_PARTY', 'Payx07', {
//   host: '127.0.0.1',
//   port: 1525,
//   dialect: 'oracle'
// });

// const sequelize = new Sequelize('dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com', 'K8S_PE_ENV_PARTY', 'Payx07', {
//   host: '127.0.0.1',
//   port: 1525,
//   dialect: 'oracle',
//   dialectOptions: {
//     // connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'
//     connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'

//   }
// });


//----------------------------------------------------------

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


// app.get('/api/notificationfilter-service-types', async (req, res) => {
//   try {
//     const serviceTypes = await NotificationTemplate.findAll({
//       attributes: ['name'],
//       group: ['name'] // Assuming 'name' contains the service type part
//     });
//     res.json(serviceTypes.map(item => item.name.split('.')[0])); // Assuming the service type is the first part of the name
//   } catch (error) {
//     console.error('Error fetching service types from notifications:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


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

// app.get('/api/notification-templates/:id', async (req, res) => {
//   try {
//     const template = await NotificationTemplate.findByPk(req.params.id);
//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }
//     const parts = template.name.split('.');
//     const serviceType = parts.shift() || 'N/A';
//     let party = parts.pop() || 'N/A';
//     let eventTrigger = parts.join('.') || 'N/A';
//     if (party.match(/^[0-9a-zA-Z]$/)) {
//       party = parts.pop() || 'N/A';
//       eventTrigger = parts.join('.') || 'N/A';
//     }
//     const defaultChannel = template.default_channel;
//     const templateDefinition = JSON.parse(template.template_definition);
//     const notificationDetails = {
//       id: template.id,
//       serviceType,
//       eventTrigger,
//       party,
//       createdOn: template.created_on,
//       channel: defaultChannel,
//       languages: templateDefinition.map(td => ({
//         language: td.messageDetails.definition.map(def => def.language),
//         header: eventTrigger,
//         messageBody: td.messageDetails.definition.map(def => def.text)
//       }))
//     };
//     res.json(notificationDetails);
//   } catch (error) {
//     console.error('Error fetching notification template:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/api/notification-templates/:id', async (req, res) => {
//   try {
//     const template = await NotificationTemplate.findByPk(req.params.id);
//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     const parts = template.name.split('.');
//     const serviceType = parts.shift() || 'N/A';
//     let party = parts.pop() || 'N/A';
//     let eventTrigger = parts.join('.') || 'N/A';

//     // Adjust for single character or number party entries
//     if (party.match(/^[0-9a-zA-Z]$/)) {
//       party = parts.pop() || 'N/A';
//       eventTrigger = parts.join('.') || 'N/A';
//     }

//     const defaultChannel = template.default_channel; // Assumes default_channel is directly stored
//     const templateDefinition = JSON.parse(template.template_definition);

//     const languages = templateDefinition.map(def => {
//       return {
//         language: def.notificationDetails.basedOn, // Assuming this is how language is stored
//         header: eventTrigger, // You can adjust as needed
//         messageBody: def.messageDetails.definition.map(d => d.text)
//       };
//     });

//     const notificationDetails = {
//       id: template.id,
//       serviceType,
//       eventTrigger,
//       party,
//       createdOn: template.created_on,
//       channel: defaultChannel,
//       languages
//     };

//     res.json(notificationDetails);
//   } catch (error) {
//     console.error('Error fetching notification template:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

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
    if (template.template_definition) {
      const templateDefinition = JSON.parse(template.template_definition);
      console.log('Parsed Template Definition:', templateDefinition); // Debugging log

      const languages = templateDefinition.map(def => {
        return {
          language: def.notificationDetails.basedOn, // Ensure this is correctly referencing the language field
          header: eventTrigger, // You can adjust as needed
          messageBody: def.messageDetails.definition.map(d => d.text)
        };
      });

      const notificationDetails = {
        id: template.id,
        serviceType,
        eventTrigger,
        party,
        createdOn: template.created_on,
        channel: defaultChannel,
        languages
      };

      res.json(notificationDetails);
    } else {
      res.status(404).json({ message: 'Template definition not found or malformed JSON' });
    }
  } catch (error) {
    console.error('Error fetching notification template:', error);
    res.status(500).json({ message: error.message });
  }
});


// Fetch all unique service types for filtering
// app.get('/api/filter-service-types', async (req, res) => {
//   try {
//     const serviceTypes = await NotificationTemplate.findAll({
//       attributes: [[sequelize.fn('DISTINCT', sequelize.col('serviceType')), 'serviceType']]
//     });
//     res.json(serviceTypes.map(item => item.serviceType));
//   } catch (error) {
//     console.error('Error fetching service types for filtering:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all event triggers based on a selected service type for filtering
// app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
//   try {
//     const { serviceType } = req.params;
//     const eventTriggers = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}%`
//         }
//       },
//       attributes: [[sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 2)), 'eventTrigger']]
//     });
//     res.json(eventTriggers.map(item => item.eventTrigger));
//   } catch (error) {
//     console.error('Error fetching event triggers for filtering based on service type:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all parties based on a selected event trigger for filtering
// app.get('/api/filter-parties/:eventTrigger', async (req, res) => {
//   try {
//     const { eventTrigger } = req.params;
//     const parties = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `%${eventTrigger}%`
//         }
//       },
//       attributes: [[sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 3)), 'party']]
//     });
//     res.json(parties.map(item => item.party));
//   } catch (error) {
//     console.error('Error fetching parties for filtering based on event trigger:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// Fetch all unique service types for filtering
// app.get('/api/filter-service-types', async (req, res) => {
//   try {
//     const serviceTypes = await NotificationTemplate.findAll({
//       attributes: [
//         [sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 1)), 'serviceType']
//       ]
//     });
//     res.json(serviceTypes.map(t => t.serviceType));
//   } catch (error) {
//     console.error('Error fetching service types for filtering:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all event triggers based on a selected service type for filtering
// app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
//   const { serviceType } = req.params;
//   try {
//     const eventTriggers = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}%`
//         }
//       },
//       attributes: [
//         [sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 2)), 'eventTrigger']
//       ]
//     });
//     res.json(eventTriggers.map(t => t.eventTrigger));
//   } catch (error) {
//     console.error('Error fetching event triggers for filtering based on service type:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all parties based on a selected event trigger for filtering
// app.get('/api/filter-parties/:serviceType', async (req, res) => {
//   const { serviceType } = req.params;
//   try {
//     const parties = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `%${serviceType}%`
//         }
//       },
//       attributes: [
//         [sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 3)), 'party']
//       ]
//     });
//     res.json(parties.map(t => t.party));
//   } catch (error) {
//     console.error('Error fetching parties for filtering based on service type:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

app.get('/api/filter-service-types', async (req, res) => {
  try {
    const serviceTypes = await NotificationTemplate.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 1)), 'serviceType']
      ]
    });
    res.json(serviceTypes.map(t => t.serviceType));
  } catch (error) {
    console.error('Error fetching service types:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;
    const eventTriggers = await NotificationTemplate.findAll({
      where: sequelize.where(sequelize.fn('split_part', sequelize.col('name'), '.', 1), serviceType),
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 2)), 'eventTrigger']
      ]
    });
    res.json(eventTriggers.map(t => t.eventTrigger));
  } catch (error) {
    console.error('Error fetching event triggers:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/filter-parties/:serviceType/:eventTrigger', async (req, res) => {
  const { serviceType, eventTrigger } = req.params;
  try {
    const parties = await NotificationTemplate.findAll({
      where: {
        [Sequelize.Op.and]: [
          sequelize.where(sequelize.fn('split_part', sequelize.col('name'), '.', 1), serviceType),
          sequelize.where(sequelize.fn('split_part', sequelize.col('name'), '.', 2), eventTrigger)
        ]
      },
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.fn('split_part', sequelize.col('name'), '.', 3)), 'party']
      ]
    });
    res.json(parties.map(t => t.party));
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({ message: error.message });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



