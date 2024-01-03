const express = require('express');
const router = express.Router();
const sectorsController = require('../../controllers/sectors');


router.get('/', sectorsController.getAllSectors);
router.post('/', sectorsController.addSector);

module.exports = router;

