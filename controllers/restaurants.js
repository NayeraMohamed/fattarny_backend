const MongoClient = require('mongodb').MongoClient;

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;

exports.get_all_restaurants = (req, res) =>{
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err)
            return res.status(500).send("Bad Connection");

        const dbo = db.db(dbName);

        dbo.collection("Restaurants").find({}).toArray(function(err, restaurants) {
            if (err)
                res.status(500).send("Connection Error");
            else
                res.status(200).send(restaurants);
            db.close();
        });   
    });

}

exports.get_single_restaurant = (req, res) => {
    var restaurantId = parseInt(req.params.restaurant_id);
    
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err)
            return res.status(500).send("Bad Connection");

         const dbo = db.db(dbName);

         var query = {id : restaurantId};
         dbo.collection("Restaurants").find(query).toArray(function(err, restaurant) {
            if (err) 
                res.status(500).send("Connection Error");
            else
                res.status(200).send(restaurant);
            db.close();
        });   
    });
}