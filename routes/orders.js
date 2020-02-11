var express = require('express');
var router = express.Router();

const OrdersController = require('../controllers/orders');

router.get("/:user_id", OrdersController.get_orders_history);
router.put("/set_is_paid/:order_id/:is_paid", OrdersController.set_is_paid);
router.delete("/cancel_order/:order_id",OrdersController.cancel_order);
router.post("/create_order", OrdersController.create_order);
router.post("/create_orders", OrdersController.create_orders);
router.get("/get_all/:date", OrdersController.get_all);
router.get("/get_all_paid/:date/:is_paid", OrdersController.get_all_paid);
router.get("/orders_summary", OrdersController.orders_summary);

module.exports = router;