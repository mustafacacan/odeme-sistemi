const express = require('express');
const router = express.Router();

const addressController = require('../controller/addressController');
const auth = require('../middlewares/verifyToken');

router
    .get('/', auth, addressController.get)
    .get('/:id', auth, addressController.getById)
    .post('/', auth, addressController.create)
    .put('/:id', auth, addressController.update)
    .delete('/:id', auth, addressController.remove)


module.exports = router;