const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

router.route('/').get(inventoryController.getItem).post(inventoryController.createItem)

module.exports = router