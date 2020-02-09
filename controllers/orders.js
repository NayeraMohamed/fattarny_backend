var mongo = require('mongodb');
var mongoose=require('mongoose')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nayera:1234@cluster0-dwvui.mongodb.net";

const dbName = "Fattarny";
const tag = "Controller_Orders";

exports.get_user_orders = (req, res) => {
    console.log(tag + "-get_user_orders-" + res);
    var userId = parseInt(req.params.user_id);
    
    MongoClient.connect(url, function(err, db) {
        console.log(tag + "-mongo_connection-error" + err);
         if (err) throw err;
         const dbo = db.db(dbName);
         var query = {user_id : userId};
         dbo.collection("Orders").find(query).toArray(function(err, orders) {
            console.log(tag + "-get_user_orders-error-" + err);
            if (err) throw err;
            res.status(200).send(orders);
            db.close();
          });   
        });
}

exports.set_paid = (req, res) => {
    console.log(tag + "-set_paid-" + res);
    var orderId = parseInt(req.params.order_id);

    
    MongoClient.connect(url, function(err, db) {
        console.log(tag + "-mongo_connection-error" + err);
         if (err) throw err;
         const dbo = db.db(dbName);

        var query = {id : orderId};
        var newValue = {$set: {is_paid : true}};

         dbo.collection("Orders").updateOne(query, newValue, function(err, orders) {
            console.log(tag + "-set_paid-error-" + err);
            if (err) throw err;
            res.status(200).send(orders);
            db.close();
        });   
    });
}

//Create new order.
//get all paid orders for today.
//get all orders for today.


//Cancel order.
exports.cancel_order = (req, res) => {
    console.log(tag + "-cancel_order-" + res);
    var orderId = (req.params.order_id);
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var myquery = { _id:mongoose.Types.ObjectId( orderId) };//orderID

      dbo.collection("Orders").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
        res.status(200).send(obj);
      });
    });
    














}