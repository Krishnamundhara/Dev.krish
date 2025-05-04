const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Placeholder for bills routes
router.get('/', auth, (req, res) => {
  res.json({ message: 'Bills route working' });
});

module.exports = router; 