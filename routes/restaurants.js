var express = require('express');
var router = express.Router();

const RestaurantsController = require('../controllers/restaurantsController');

router.get('/', RestaurantsController.get_all_restaurants);
router.get('/:restaurant_id', RestaurantsController.get_single_restaurant);

module.exports = router;