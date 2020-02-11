const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

const helper_functions = require('../helper_functions');

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;


exports.get_orders_history = (req, res) => {
    var userId = req.params.user_id;

    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) 
            return res.status(500).send("Bad Connection");

         const dbo = db.db(dbName);
         var query = {user_id : userId, is_paid : true};
         dbo.collection("Orders").find(query).toArray(function(err, orders) {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(orders);
            db.close();
        });   
    });
}

exports.set_is_paid = (req, res) => {
    var orderId = req.params.order_id;
    var isPaid =  JSON.parse(req.params.is_paid);

    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) 
            return res.status(500).send("Bad Connection");

        const dbo = db.db(dbName);
        var query = {_id : mongoose.Types.ObjectId(orderId)};
        var newValue = {$set: {is_paid : isPaid}};
         dbo.collection("Orders").updateOne(query, newValue, function(err, response) {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(response);
            db.close();
        });   
    });
}

exports.create_order = (req, res) => {
    var newOrder = req.body;
    newOrder = helper_functions.calculate_order_total_sum(newOrder);

    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) 
            return res.status(500).send("Bad Connection");

        const dbo = db.db(dbName);
         dbo.collection("Orders").insertOne(newOrder, function(err, response) {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(response);
            db.close();
        });   
    });
}

exports.create_orders = (req, res) => {
    var newOrders = req.body;
    newOrders= helper_functions.calculate_orders_total_sum(newOrders);

    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) 
            return res.status(500).send("Bad Connection");

        const dbo = db.db(dbName);
         dbo.collection("Orders").insertMany(newOrders, function(err, response) {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(response);
            db.close();
        });   
    });
}

exports.cancel_order = (req, res) => {
    var orderId = (req.params.order_id);
    
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) 
            return res.status(500).send("Bad Connection");

        var dbo = db.db(dbName);
        var myquery = { _id : mongoose.Types.ObjectId(orderId) };

        dbo.collection("Orders").deleteOne(myquery, function(err, obj) {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(obj);
            db.close();
        });
    });
}   
    
exports.get_all = (req, res) => {
    var date_today = (req.params.date);
    
    MongoClient.connect(dbConnectionString, function(err, db){
        if (err) 
            return res.status(500).send("Bad Connection");

        var dbo = db.db(dbName);
        var query = { date : date_today };
        dbo.collection("Orders").find(query).toArray(function(err, result)
        {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(result);
            db.close;
        });
    });
}

exports.get_all_paid = (req, res) => {
    var date_tod = (req.params.date);
    var  is_true = JSON.parse(req.params.is_paid);

    MongoClient.connect(dbConnectionString, function(err, db){
        if (err) 
            return res.status(500).send("Bad Connection");

        var dbo=db.db(dbName);
        var query = { date : date_tod, is_paid : is_true };
        dbo.collection("Orders").find(query).toArray(function(err, result)
        {
            if (err) 
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(result);
            db.close;
        });
    });
}

exports.orders_summary = (req, res) => {
    var orderDate = req.params.date;

    MongoClient.connect(dbConnectionString, function(err, db){
        if(err)
            return res.status(500).send("Bad Connection");
        
        var dbo=db.db(dbName);
        dbo.collection('Orders').aggregate([
            {
                $match: {
                    date : orderDate,
                    is_paid : true
                }
            }, 
            {
                $unwind: {
                    path : "$order_items"
                }
            },
            {
                $group: {
                    _id : "$order_items.item",
                    count : {
                        $sum : "$order_items.quantity"
                    }
                }
            },
            {
                $project: {
                    _id   : 0,
                    count : 1,
                    item  : "$_id"
                }
            }
        ]).toArray(function(err, summary) {
            if(err)
                res.status(500).send("Bad Connection");
            else
                res.status(200).send(summary);
            dbo.close;
        });
    });
}