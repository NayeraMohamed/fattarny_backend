var express = require('express');
var router = express.Router();

const OrdersController= require('../controllers/orders');

router.get("/:user_id", OrdersController.get_user_orders);
router.put("/set_paid_for/:order_id", OrdersController.set_paid);
router.delete("/cancel_order/:order_id",OrdersController.cancel_order);
module.exports = router;