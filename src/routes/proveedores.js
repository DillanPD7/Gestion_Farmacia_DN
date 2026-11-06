const express = require('express');
const { proveedores } = require('../data');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(proveedores);
});

module.exports = router;
