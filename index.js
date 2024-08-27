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
//     const texts = templates.flatMap(template => {
//       try {
//         const templateData = JSON.parse(template.template_definition);
//         return templateData.map(def => def.messageDetails.definition.map(d => d.text)).flat();
//       } catch (error) {
//         console.error(`Failed to parse JSON for template ID ${template.id}:`, error);
//         return [];
//       }
//     });
//     res.json({ texts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch languages from template_definition
// app.get('/api/notification/languages', async (req, res) => {
//   try {
//     const templates = await NotificationTemplate.findAll();
//     const languages = templates.flatMap(template => {
//       try {
//         const templateData = JSON.parse(template.template_definition);
//         return templateData.map(def => def.messageDetails.definition.map(d => d.language)).flat();
//       } catch (error) {
//         console.error(`Failed to parse JSON for template ID ${template.id}:`, error);
//         return [];
//       }
//     });
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

// // app.get('/api/parameters', async (req, res) => {
// //   const parameters = await ParamMapping.findAll({
// //     attributes: ['param_name'],
// //     group: ['param_name']
// //   });
// //   res.json(parameters.map(item => item.param_name));
// // });

// //---------------------new-------------------

// // app.get('/api/parameters', async (req, res) => {
// //   const { serviceCode, eventName, partyType } = req.query;
  
// //   try {
// //     const parameters = await ParamMapping.findAll({
// //       where: {
// //         event_name: eventName,
// //         party_type: partyType
// //       },
// //       attributes: ['param_name']
// //     });

// //     const paramNames = parameters.map(item => item.param_name);
// //     res.json(paramNames);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // API for fetching parameters for the create notification layout
// app.get('/api/create-parameters', async (req, res) => {
//   try {
//     const parameters = await ParamMapping.findAll({
//       attributes: ['param_name'],
//       group: ['param_name']
//     });
//     res.json(parameters.map(item => item.param_name));
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API for fetching parameters for the edit notification layout
// app.get('/api/edit-parameters', async (req, res) => {
//   const { serviceCode, eventName, partyType } = req.query;
  
//   try {
//     const parameters = await ParamMapping.findAll({
//       where: {
//         event_name: eventName,
//         party_type: partyType
//       },
//       attributes: ['param_name']
//     });

//     const paramNames = parameters.map(item => item.param_name);
//     res.json(paramNames);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// //---------------------------------------------------------

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

// // API to fetch languages and texts from template_definition
// app.get('/api/notification-details/:id', async (req, res) => {
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

//     res.json({
//       serviceType: template.name.split('.')[0],
//       eventTrigger: template.name.split('.')[1],
//       party: template.name.split('.')[2],
//       createdOn: template.created_on,
//       channel: template.default_channel,
//       languagesTexts
//     });
//   } catch (error) {
//     console.error('Error fetching notification details:', error);
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

















































//new2



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

// API to fetch languages from SYS_ENUMERATION table
app.get('/api/languages', async (req, res) => {
  try {
    const query = `
      SELECT enum_code, description 
      FROM SYS_ENUMERATION 
      WHERE ENUM_TYPE_ID = 'NOTIF_LANGUAGE'
    `;
    const languages = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT
    });

    // Optionally, format the data to match what the frontend expects
    const formattedLanguages = languages.map(lang => ({
      code: lang.enum_code,
      name: lang.description
    }));

    res.json(formattedLanguages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: error.message });
  }
});

// API to fetch languages and texts from template_definition
app.get('/api/notification-details/:id', async (req, res) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Fetch all languages from SYS_ENUMERATION table
    const languages = await sequelize.query(`
      SELECT enum_code, description 
      FROM SYS_ENUMERATION 
      WHERE ENUM_TYPE_ID = 'NOTIF_LANGUAGE'
    `, {
      type: Sequelize.QueryTypes.SELECT
    });

    const languageMap = languages.reduce((map, lang) => {
      map[lang.enum_code] = lang.description;
      return map;
    }, {});

    const templateDefinition = JSON.parse(template.template_definition || '[]');
    const languagesTexts = templateDefinition.flatMap(def =>
      def.messageDetails.definition.map(d => ({
        language: languageMap[d.language] || d.language, // Map the code to its name
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

// Other existing APIs...

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

// API for fetching parameters for the create notification layout
app.get('/api/create-parameters', async (req, res) => {
  try {
    const parameters = await ParamMapping.findAll({
      attributes: ['param_name'],
      group: ['param_name']
    });
    res.json(parameters.map(item => item.param_name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API for fetching parameters for the edit notification layout
app.get('/api/edit-parameters', async (req, res) => {
  const { serviceCode, eventName, partyType } = req.query;

  try {
    const parameters = await ParamMapping.findAll({
      where: {
        service_code: serviceCode,
        event_name: eventName,
        party_type: partyType
      },
      attributes: ['param_name']
    });

    const paramNames = parameters.map(item => item.param_name);
    res.json(paramNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

// API to fetch languages and texts from template_definition (repeated for specific use case)
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

// final API to fetch unique service types
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

// Sync database
sequelize.sync().catch(err => console.log('Error: ' + err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

















// //new for oracle :

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const oracledb = require('oracledb');  // Import oracledb

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Oracle DB connection details
// const dbConfig = {
//   user: 'K8S_PE_ENV_PARTY',
//   password: 'Payx07',
//   connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'
// };

// // Function to execute queries
// async function executeQuery(query, params = []) {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(query, params);
//     return result.rows;
//   } catch (err) {
//     console.error('Error executing query:', err);
//     throw err;
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//         console.log('Connection closed');
//       } catch (err) {
//         console.error('Error closing connection:', err);
//       }
//     }
//   }
// }

// // Define models (mapped to your tables)
// const models = {
//   paramMapping: {
//     name: 'param_mapping_list',
//     columns: ['event_name', 'party_type', 'param_name']
//   },
//   serviceCode: {
//     name: 'service_code',
//     columns: ['code']
//   },
//   notificationTemplate: {
//     name: 'notification_template',
//     columns: ['name', 'created_on', 'default_channel', 'template_definition']
//   }
// };

// // API to fetch texts from template_definition
// app.get('/api/notification/texts', async (req, res) => {
//   try {
//     const templates = await executeQuery(`SELECT ${models.notificationTemplate.columns.join(', ')} FROM ${models.notificationTemplate.name}`);
//     const texts = templates.flatMap(template => {
//       try {
//         const templateData = JSON.parse(template[3]); // template_definition is at index 3
//         return templateData.map(def => def.messageDetails.definition.map(d => d.text)).flat();
//       } catch (error) {
//         console.error('Failed to parse JSON:', error);
//         return [];
//       }
//     });
//     res.json({ texts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch languages from template_definition
// app.get('/api/notification/languages', async (req, res) => {
//   try {
//     const templates = await executeQuery(`SELECT ${models.notificationTemplate.columns.join(', ')} FROM ${models.notificationTemplate.name}`);
//     const languages = templates.flatMap(template => {
//       try {
//         const templateData = JSON.parse(template[3]); // template_definition is at index 3
//         return templateData.map(def => def.messageDetails.definition.map(d => d.language)).flat();
//       } catch (error) {
//         console.error('Failed to parse JSON:', error);
//         return [];
//       }
//     });
//     res.json({ languages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch service types
// app.get('/api/service-types', async (req, res) => {
//   try {
//     const serviceTypes = await executeQuery(`SELECT DISTINCT ${models.serviceCode.columns.join(', ')} FROM ${models.serviceCode.name}`);
//     res.json(serviceTypes.map(item => item[0]));
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch event triggers
// app.get('/api/event-triggers', async (req, res) => {
//   try {
//     const eventTriggers = await executeQuery(`SELECT DISTINCT ${models.paramMapping.columns[0]} FROM ${models.paramMapping.name}`);
//     res.json(eventTriggers.map(item => item[0]));
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch parties
// app.get('/api/parties', async (req, res) => {
//   try {
//     const parties = await executeQuery(`SELECT DISTINCT ${models.paramMapping.columns[1]} FROM ${models.paramMapping.name}`);
//     res.json(parties.map(item => item[0]));
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API to fetch notification templates
// app.get('/api/notification-templates', async (req, res) => {
//   const { serviceType, eventTrigger, party, startDate, endDate } = req.query;
  
//   let whereClauses = [];
//   let params = [];

//   if (serviceType) {
//     whereClauses.push(`name LIKE :serviceType`);
//     params.push(`${serviceType}.%`);
//   }

//   if (eventTrigger) {
//     whereClauses.push(`name LIKE :eventTrigger`);
//     params.push(`%${eventTrigger}%`);
//   }

//   if (party) {
//     whereClauses.push(`name LIKE :party`);
//     params.push(`%${party}`);
//   }

//   if (startDate && endDate) {
//     whereClauses.push(`created_on BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')`);
//     params.push(startDate, endDate);
//   }

//   const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

//   try {
//     const templates = await executeQuery(`SELECT ${models.notificationTemplate.columns.join(', ')} FROM ${models.notificationTemplate.name} ${whereClause}`, params);
    
//     const formattedTemplates = templates.map(template => {
//       const parts = template[0].split('.');
//       const serviceType = parts.shift() || 'N/A';
//       let party = parts.pop() || 'N/A';
//       let eventTrigger = parts.join('.') || 'N/A';
//       if (party.match(/^[0-9a-zA-Z]$/)) {
//         party = parts.pop() || 'N/A';
//         eventTrigger = parts.join('.') || 'N/A';
//       }
//       return {
//         id: template[0],  // Assuming the ID is in the first column
//         serviceType: serviceType,
//         eventTrigger: eventTrigger,
//         party: party,
//         createdOn: template[1]
//       };
//     });

//     res.json(formattedTemplates);
//   } catch (error) {
//     console.error('Error fetching notification templates:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
