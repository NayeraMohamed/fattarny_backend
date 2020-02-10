const MongoClient = require('mongodb').MongoClient;

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;

exports.get_restaurant_items = (req, res) => {
    var restaurantId = parseInt(req.params.restaurant_id);
    
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err)
            res.status(500).send("Connection Error");
        
        const dbo = db.db(dbName);
        var query = {restaurant_id : restaurantId};
         dbo.collection("Items").find(query).toArray(function(err, items) {
            if (err)
                res.status(500).send("Connection Error");
            
            res.status(200).send(items);
            db.close();
        });   
    });
}