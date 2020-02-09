var express = require('express');
var router = express.Router();

const ItemsController= require('../controllers/items');

router.get("/:restaurant_id", ItemsController.get_restaurant_items);
router.get("/sum_prices" , ItemsController.get_total_sum);
module.exports = router;