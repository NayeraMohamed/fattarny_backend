var express = require('express');
var router = express.Router();

const OrdersController= require('../controllers/orders');

router.get("/:user_id", OrdersController.get_orders_history);
router.put("/set_is_paid/:order_id/:is_paid", OrdersController.set_is_paid);
router.delete("/cancel_order/:order_id",OrdersController.cancel_order);
router.post("/create_order", OrdersController.create_order);
module.exports = router;