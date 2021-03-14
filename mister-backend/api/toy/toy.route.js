const express = require('express');
const toyController = require('./toy.controller');

const router = express.Router();

router.get('/', toyController.getToys);
router.get('/:id', toyController.getToy);
router.delete('/:id', toyController.deleteToy);
router.post('/', toyController.saveToy);
module.exports = router;
