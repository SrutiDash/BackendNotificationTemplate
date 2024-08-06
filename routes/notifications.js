// const express = require('express');
// const router = express.Router();
// const Notification = require('../models/notification');

// router.post('/', async (req, res) => {
//   try {
//     const { serviceType, eventTrigger, party, createdBy } = req.body;
//     const newNotification = await Notification.create({
//       serviceType,
//       eventTrigger,
//       party,
//       createdBy
//     });
//     res.status(201).json(newNotification);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// Route to fetch all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new notification
router.post('/', async (req, res) => {
  try {
    const { serviceType, eventTrigger, party, createdBy } = req.body;
    const newNotification = await Notification.create({
      serviceType,
      eventTrigger,
      party,
      createdBy
    });
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
