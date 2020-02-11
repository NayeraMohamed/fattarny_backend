var express = require('express');
var router = express.Router();

const ItemsController = require('../controllers/itemsController');

router.get("/:restaurant_id", ItemsController.get_restaurant_items);

module.exports = router;