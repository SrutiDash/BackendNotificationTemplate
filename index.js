// //new--------------------------------------------------------------


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Sequelize, DataTypes, Op } = require('sequelize');

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

// // const NotificationTemplate = sequelize.define('notification_template', {
// //   name: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   created_on: {
// //     type: DataTypes.DATE,
// //     allowNull: false
// //   },
// //   default_channel: {
// //     type: DataTypes.STRING,
// //     allowNull: true
// //   },
// //   template_definition: {
// //     type: DataTypes.TEXT,
// //     allowNull: true
// //   }
// // }, {
// //   timestamps: false,
// //   tableName: 'notification_template'
// // });

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
//     type: DataTypes.JSONB,
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
//   const { serviceType, eventTrigger, party, startDate, endDate } = req.query;
  
//   const where = {};

//   if (serviceType) {
//     where.name = {
//       [Op.like]: `${serviceType}.%`
//     };
//   }

//   if (eventTrigger) {
//     where.name = {
//       ...where.name,
//       [Op.like]: `%${eventTrigger}%`
//     };
//   }

//   if (party) {
//     where.name = {
//       ...where.name,
//       [Op.like]: `%${party}`
//     };
//   }

//   if (startDate && endDate) {
//     where.created_on = {
//       [Op.between]: [new Date(startDate), new Date(endDate)]
//     };
//   }

//   try {
//     const templates = await NotificationTemplate.findAll({
//       where
//     });

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
//     let languages = [];
//     if (template.template_definition) {
//       const templateDefinition = JSON.parse(template.template_definition);
//       console.log('Parsed Template Definition:', templateDefinition); // Debugging log

//       languages = templateDefinition.map(def => {
//         return {
//           language: def.notificationDetails.basedOn, // Ensure this is correctly referencing the language field
//           header: eventTrigger, // You can adjust as needed
//           messageBody: def.messageDetails.definition.map(d => d.text)
//         };
//       });
//     }

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


// // final
// app.get('/api/filter-service-types', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll({
//       attributes: ['name']
//     });

//     const serviceTypes = templates.map(template => template.name.split('.')[0]);
//     const uniqueServiceTypes = [...new Set(serviceTypes)];

//     res.json(uniqueServiceTypes);
//   } catch (error) {
//     console.error('Error fetching service types:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all event triggers based on a selected service type for filtering
// app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
//   try {
//     const { serviceType } = req.params;
//     const templates = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}.%`
//         }
//       },
//       attributes: ['name']
//     });

//     const eventTriggers = templates.map(template => {
//       const parts = template.name.split('.');
//       parts.shift(); // Remove serviceType
//       let party = parts.pop();
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop();
//       }
//       return parts.join('.');
//     });

//     const uniqueEventTriggers = [...new Set(eventTriggers)];

//     res.json(uniqueEventTriggers);
//   } catch (error) {
//     console.error('Error fetching event triggers:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all parties based on a selected service type and event trigger for filtering
// app.get('/api/filter-parties/:serviceType/:eventTrigger', async (req, res) => {
//   const { serviceType, eventTrigger } = req.params;
//   try {
//     const templates = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}.${eventTrigger}%`
//         }
//       },
//       attributes: ['name']
//     });

//     const parties = templates.map(template => {
//       const parts = template.name.split('.');
//       parts.shift(); // Remove serviceType
//       let party = parts.pop();
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop();
//       }
//       return party;
//     });

//     const uniqueParties = [...new Set(parties)];

//     res.json(uniqueParties);
//   } catch (error) {
//     console.error('Error fetching parties:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



///newwww///


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Sequelize, DataTypes, Op } = require('sequelize');

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
//     type: DataTypes.JSONB,
//     allowNull: false
//   }
// }, {
//   timestamps: false,
//   tableName: 'notification_template'
// });

// const NotificationTemplateLanguage = sequelize.define('NotificationTemplateLanguage', {
//   template_definition: {
//     type: DataTypes.JSONB,
//     allowNull: false
//   }
// }, {
//   tableName: 'notification_template',
//   timestamps: false
// });

// const NotificationTemplateText = sequelize.define('NotificationTemplateText', {
//   template_defination: {
//     type: DataTypes.JSONB,
//     allowNull: false
//   }
// }, {
//   tableName: 'notification_template',
//   timestamps: false
// });

// app.get('/api/notification/texts', async (req, res) => {
//   try {
//     const templates = await NotificationTemplateText.findAll();
//     const texts = templates.map(template => template.template_defination[0].messageDetails.definition.map(def => def.text)).flat();
//     res.json({ texts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch languages from template_notification
// app.get('/api/notification/languages', async (req, res) => {
//   try {
//     const templates = await NotificationTemplateLanguage.findAll();
//     const languages = templates.map(template => template.template_defination[0].messageDetails.definition.map(def => def.language)).flat();
//     res.json({ languages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
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
//   const { serviceType, eventTrigger, party, startDate, endDate } = req.query;
  
//   const where = {};

//   if (serviceType) {
//     where.name = {
//       [Op.like]: `${serviceType}.%`
//     };
//   }

//   if (eventTrigger) {
//     where.name = {
//       ...where.name,
//       [Op.like]: `%${eventTrigger}%`
//     };
//   }

//   if (party) {
//     where.name = {
//       ...where.name,
//       [Op.like]: `%${party}`
//     };
//   }

//   if (startDate && endDate) {
//     where.created_on = {
//       [Op.between]: [new Date(startDate), new Date(endDate)]
//     };
//   }

//   try {
//     const templates = await NotificationTemplate.findAll({
//       where
//     });

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
//     let languages = [];
//     if (template.template_definition) {
//       const templateDefinition = JSON.parse(template.template_definition);
//       console.log('Parsed Template Definition:', templateDefinition); // Debugging log

//       languages = templateDefinition.map(def => {
//         return {
//           language: def.notificationDetails.basedOn, // Ensure this is correctly referencing the language field
//           header: eventTrigger, // You can adjust as needed
//           messageBody: def.messageDetails.definition.map(d => d.text)
//         };
//       });
//     }

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

// // New API endpoint to fetch language and text
// app.get('/api/languages-texts/:id', async (req, res) => {
//   try {
//     const template = await NotificationTemplate.findByPk(req.params.id);
//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     const templateDefinition = JSON.parse(template.template_definition || '[]');
//     const languagesTexts = templateDefinition.flatMap(def => 
//       def.messageDetails.definition.map(d => ({
//         language: d.language,
//         text: d.text
//       }))
//     );

//     res.json(languagesTexts);
//   } catch (error) {
//     console.error('Error fetching languages and texts:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // final
// app.get('/api/filter-service-types', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll({
//       attributes: ['name']
//     });

//     const serviceTypes = templates.map(template => template.name.split('.')[0]);
//     const uniqueServiceTypes = [...new Set(serviceTypes)];

//     res.json(uniqueServiceTypes);
//   } catch (error) {
//     console.error('Error fetching service types:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all event triggers based on a selected service type for filtering
// app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
//   try {
//     const { serviceType } = req.params;
//     const templates = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}.%`
//         }
//       },
//       attributes: ['name']
//     });

//     const eventTriggers = templates.map(template => {
//       const parts = template.name.split('.');
//       parts.shift(); // Remove serviceType
//       let party = parts.pop();
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop();
//       }
//       return parts.join('.');
//     });

//     const uniqueEventTriggers = [...new Set(eventTriggers)];

//     res.json(uniqueEventTriggers);
//   } catch (error) {
//     console.error('Error fetching event triggers:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all parties based on a selected service type and event trigger for filtering
// app.get('/api/filter-parties/:serviceType/:eventTrigger', async (req, res) => {
//   const { serviceType, eventTrigger } = req.params;
//   try {
//     const templates = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}.${eventTrigger}%`
//         }
//       },
//       attributes: ['name']
//     });

//     const parties = templates.map(template => {
//       const parts = template.name.split('.');
//       parts.shift(); // Remove serviceType
//       let party = parts.pop();
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop();
//       }
//       return party;
//     });

//     const uniqueParties = [...new Set(parties)];

//     res.json(uniqueParties);
//   } catch (error) {
//     console.error('Error fetching parties:', error);
//     res.status(500).json({ message: error.message });
//   }
// });
// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//new

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Sequelize, DataTypes, Op } = require('sequelize');

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
//     type: DataTypes.JSONB,
//     allowNull: false
//   }
// }, {
//   timestamps: false,
//   tableName: 'notification_template'
// });

// // Middleware
// app.use(express.json());

// // API to fetch texts from template_definition
// app.get('/api/notification/texts', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const texts = templates.map(template => {
//       const templateData = JSON.parse(template.template_definition);
//       return templateData[0].messageDetails.definition.map(def => def.text);
//     }).flat();
//     res.json({ texts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch languages from template_definition
// app.get('/api/notification/languages', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const languages = templates.map(template => {
//       const templateData = JSON.parse(template.template_definition);
//       return templateData[0].messageDetails.definition.map(def => def.language);
//     }).flat();
//     res.json({ languages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
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
//   const { serviceType, eventTrigger, party, startDate, endDate } = req.query;
  
//   const where = {};

//   if (serviceType) {
//     where.name = {
//       [Op.like]: `${serviceType}.%`
//     };
//   }

//   if (eventTrigger) {
//     where.name = {
//       ...where.name,
//       [Op.like]: `%${eventTrigger}%`
//     };
//   }

//   if (party) {
//     where.name = {
//       ...where.name,
//       [Op.like]: `%${party}`
//     };
//   }

//   if (startDate && endDate) {
//     where.created_on = {
//       [Op.between]: [new Date(startDate), new Date(endDate)]
//     };
//   }

//   try {
//     const templates = await NotificationTemplate.findAll({
//       where
//     });

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
//     let languages = [];
//     if (template.template_definition) {
//       const templateDefinition = JSON.parse(template.template_definition);
//       console.log('Parsed Template Definition:', templateDefinition); // Debugging log

//       languages = templateDefinition.map(def => {
//         return {
//           language: def.notificationDetails.basedOn, // Ensure this is correctly referencing the language field
//           header: eventTrigger, // You can adjust as needed
//           messageBody: def.messageDetails.definition.map(d => d.text)
//         };
//       });
//     }

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

// // New API endpoint to fetch language and text
// app.get('/api/languages-texts/:id', async (req, res) => {
//   try {
//     const template = await NotificationTemplate.findByPk(req.params.id);
//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     const templateDefinition = JSON.parse(template.template_definition || '[]');
//     const languagesTexts = templateDefinition.flatMap(def => 
//       def.messageDetails.definition.map(d => ({
//         language: d.language,
//         text: d.text
//       }))
//     );

//     res.json(languagesTexts);
//   } catch (error) {
//     console.error('Error fetching languages and texts:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // final
// app.get('/api/filter-service-types', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll({
//       attributes: ['name']
//     });

//     const serviceTypes = templates.map(template => template.name.split('.')[0]);
//     const uniqueServiceTypes = [...new Set(serviceTypes)];

//     res.json(uniqueServiceTypes);
//   } catch (error) {
//     console.error('Error fetching service types:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all event triggers based on a selected service type for filtering
// app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
//   try {
//     const { serviceType } = req.params;
//     const templates = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}.%`
//         }
//       },
//       attributes: ['name']
//     });

//     const eventTriggers = templates.map(template => {
//       const parts = template.name.split('.');
//       parts.shift(); // Remove serviceType
//       let party = parts.pop();
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop();
//       }
//       return parts.join('.');
//     });

//     const uniqueEventTriggers = [...new Set(eventTriggers)];

//     res.json(uniqueEventTriggers);
//   } catch (error) {
//     console.error('Error fetching event triggers:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Fetch all parties based on a selected service type and event trigger for filtering
// app.get('/api/filter-parties/:serviceType/:eventTrigger', async (req, res) => {
//   const { serviceType, eventTrigger } = req.params;
//   try {
//     const templates = await NotificationTemplate.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.like]: `${serviceType}.${eventTrigger}%`
//         }
//       },
//       attributes: ['name']
//     });

//     const parties = templates.map(template => {
//       const parts = template.name.split('.');
//       parts.shift(); // Remove serviceType
//       let party = parts.pop();
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop();
//       }
//       return party;
//     });

//     const uniqueParties = [...new Set(parties)];

//     res.json(uniqueParties);
//   } catch (error) {
//     console.error('Error fetching parties:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');

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
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'notification_template'
});

// Middleware
app.use(express.json());

// API to fetch texts from template_definition
app.get('/api/notification/texts', async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll();
    const texts = templates.flatMap(template => {
      try {
        const templateData = JSON.parse(template.template_definition);
        return templateData.map(def => def.messageDetails.definition.map(d => d.text)).flat();
      } catch (error) {
        console.error(`Failed to parse JSON for template ID ${template.id}:`, error);
        return [];
      }
    });
    res.json({ texts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to fetch languages from template_definition
app.get('/api/notification/languages', async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll();
    const languages = templates.flatMap(template => {
      try {
        const templateData = JSON.parse(template.template_definition);
        return templateData.map(def => def.messageDetails.definition.map(d => d.language)).flat();
      } catch (error) {
        console.error(`Failed to parse JSON for template ID ${template.id}:`, error);
        return [];
      }
    });
    res.json({ languages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  const { serviceType, eventTrigger, party, startDate, endDate } = req.query;
  
  const where = {};

  if (serviceType) {
    where.name = {
      [Op.like]: `${serviceType}.%`
    };
  }

  if (eventTrigger) {
    where.name = {
      ...where.name,
      [Op.like]: `%${eventTrigger}%`
    };
  }

  if (party) {
    where.name = {
      ...where.name,
      [Op.like]: `%${party}`
    };
  }

  if (startDate && endDate) {
    where.created_on = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }

  try {
    const templates = await NotificationTemplate.findAll({
      where
    });

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
//     let languages = [];
//     if (template.template_definition) {
//       const templateDefinition = JSON.parse(template.template_definition);
//       console.log('Parsed Template Definition:', templateDefinition); // Debugging log

//       languages = templateDefinition.map(def => {
//         return {
//           language: def.notificationDetails.basedOn, // Ensure this is correctly referencing the language field
//           header: eventTrigger, // You can adjust as needed
//           messageBody: def.messageDetails.definition.map(d => d.text)
//         };
//       });
//     }

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

// API to fetch languages and texts from template_definition
app.get('/api/notification-details/:id', async (req, res) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const templateDefinition = JSON.parse(template.template_definition || '[]');
    const languagesTexts = templateDefinition.flatMap(def =>
      def.messageDetails.definition.map(d => ({
        language: d.language,
        text: d.text
      }))
    );

    res.json({
      serviceType: template.name.split('.')[0],
      eventTrigger: template.name.split('.')[1],
      party: template.name.split('.')[2],
      createdOn: template.created_on,
      channel: template.default_channel,
      languagesTexts
    });
  } catch (error) {
    console.error('Error fetching notification details:', error);
    res.status(500).json({ message: error.message });
  }
});


// New API endpoint to fetch language and text
app.get('/api/languages-texts/:id', async (req, res) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const templateDefinition = JSON.parse(template.template_definition || '[]');
    const languagesTexts = templateDefinition.flatMap(def => 
      def.messageDetails.definition.map(d => ({
        language: d.language,
        text: d.text
      }))
    );

    res.json(languagesTexts);
  } catch (error) {
    console.error('Error fetching languages and texts:', error);
    res.status(500).json({ message: error.message });
  }
});

// final
app.get('/api/filter-service-types', async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll({
      attributes: ['name']
    });

    const serviceTypes = templates.map(template => template.name.split('.')[0]);
    const uniqueServiceTypes = [...new Set(serviceTypes)];

    res.json(uniqueServiceTypes);
  } catch (error) {
    console.error('Error fetching service types:', error);
    res.status(500).json({ message: error.message });
  }
});

// Fetch all event triggers based on a selected service type for filtering
app.get('/api/filter-event-triggers/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;
    const templates = await NotificationTemplate.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `${serviceType}.%`
        }
      },
      attributes: ['name']
    });

    const eventTriggers = templates.map(template => {
      const parts = template.name.split('.');
      parts.shift(); // Remove serviceType
      let party = parts.pop();
      if (party.match(/^[0-9a-zA-Z]$/)) {
        party = parts.pop();
      }
      return parts.join('.');
    });

    const uniqueEventTriggers = [...new Set(eventTriggers)];

    res.json(uniqueEventTriggers);
  } catch (error) {
    console.error('Error fetching event triggers:', error);
    res.status(500).json({ message: error.message });
  }
});

// Fetch all parties based on a selected service type and event trigger for filtering
app.get('/api/filter-parties/:serviceType/:eventTrigger', async (req, res) => {
  const { serviceType, eventTrigger } = req.params;
  try {
    const templates = await NotificationTemplate.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `${serviceType}.${eventTrigger}%`
        }
      },
      attributes: ['name']
    });

    const parties = templates.map(template => {
      const parts = template.name.split('.');
      parts.shift(); // Remove serviceType
      let party = parts.pop();
      if (party.match(/^[0-9a-zA-Z]$/)) {
        party = parts.pop();
      }
      return party;
    });

    const uniqueParties = [...new Set(parties)];

    res.json(uniqueParties);
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
