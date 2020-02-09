var mongo = require('mongodb');
var mongoose=require('mongoose')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nayera:1234@cluster0-dwvui.mongodb.net";
const dbName = "Fattarny";
const tag = "Controller_Orders";

exports.get_orders_history = (req, res) => {
    var userId = req.params.user_id;

    MongoClient.connect(url, function(err, db) {
         if (err) res.status(500).send("Bad Connection");

         const dbo = db.db(dbName);
         var query = {user_id : userId, is_paid : true};
         dbo.collection("Orders").find(query).toArray(function(err, orders) {
            if (err) res.status(404).send("Not found");
            res.status(200).send(orders);
            
            db.close();
        });   
    });
}

exports.set_is_paid = (req, res) => {
    var orderId = req.params.order_id;
    var isPaid =  JSON.parse(req.params.is_paid);

    MongoClient.connect(url, function(err, db) {
        if (err) res.status(500).send("Bad Connection");
         
        const dbo = db.db(dbName);
        var query = {_id : mongoose.Types.ObjectId(orderId)};
        var newValue = {$set: {is_paid : isPaid}};

         dbo.collection("Orders").updateOne(query, newValue, function(err, response) {
            if (err) res.status(404).send("Not found");
            res.status(200).send(response);
            
            db.close();
        });   
    });
}

exports.create_order = (req, res) => {
    var newOrder = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) res.status(500).send("Bad Connection");
         
        const dbo = db.db(dbName);
         dbo.collection("Orders").insertOne(newOrder, function(err, response) {
            if (err) res.status(404).send("Not found");
            res.status(200).send(response);
            
            db.close();
        });   
    });
}

exports.create_orders = (req, res) => {
    var newOrders = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) res.status(500).send("Bad Connection");
         
        const dbo = db.db(dbName);
         dbo.collection("Orders").insertMany(newOrders, function(err, response) {
            if (err) res.status(404).send("Not found");
            res.status(200).send(response);
            
            db.close();
        });   
    });
}

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
    
//get all orders for today.
exports.get_all = (req, res) => {
    console.log(tag + "-get_all-" + res);
    var date_tod = (req.params.date);
    MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db(dbName);
    // var myquery = { _id:mongoose.Types.ObjectId( orderId) };//orderID
    var query = { date:date_tod };
    dbo.collection("Orders").find(query).toArray(function(err, result)
        // dbo.collection("Orders").find({projection:(date:date)}).toArray(function(err, result)
        {
            if (err)throw err;
            console.log(result);
            db.close;
            res.status(200).send(result);
        });
    });
}
//get all paid orders for today.
exports.get_all_paid = (req, res) => {
    console.log(tag + "-get_all_paid" + res);
    var date_tod = (req.params.date);
    var  is_true=JSON.parse(req.params.is_paid);
//var pan=(req.params.date,req.params.is_paid);
    MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db(dbName);
    // var myquery = { _id:mongoose.Types.ObjectId( orderId) };//orderID
    var query = { date:date_tod ,is_paid:is_true };
  //var query={ pan:date,is_paid};
    dbo.collection("Orders").find(query).toArray(function(err, result)
        // dbo.collection("Orders").find({projection:(date:date)}).toArray(function(err, result)
        {
            if (err)throw err;
            console.log(result);
            db.close;
            res.status(200).send(result);
        });
    });
}