const express = require('express');
const router = express.Router();
const userSectorsController = require('../../controllers/userSectors');

router.get('/:id', userSectorsController.getUserSectors);
router.post('/', userSectorsController.addUserSector);
router.put('/:id', userSectorsController.updateUserSector);


module.exports = router;
