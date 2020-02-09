var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nayera:1234@cluster0-dwvui.mongodb.net";

const dbName = "Fattarny";
const tag = "Controller_Restaurants";

exports.get_all_restaurants = (req, res) =>{
    console.log(tag + "-get_all-" + res.body);

    MongoClient.connect(url, function(err, db) {
        console.log(tag + "-get_all-error-" + err);
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection("Restaurants").find({}).toArray(function(err, restaurants) {
            console.log(tag + "-get_all-error-" + err);
            if (err) throw err;
            
            res.status(200).send(restaurants);
            db.close();
        });   
    });

}

exports.get_single_restaurant = (req, res) => {
    console.log(tag + "-get_restaurant_items-" + res);
    var restaurantId = parseInt(req.params.restaurant_id);
    
    MongoClient.connect(url, function(err, db) {
        console.log(tag + "-mongo_connection-error" + err);
         if (err) throw err;
         const dbo = db.db(dbName);
         var query = {id : restaurantId};
         dbo.collection("Restaurants").find(query).toArray(function(err, restaurant) {
            console.log(tag + "-get_items-error-" + err);
            if (err) throw err;
            res.status(200).send(restaurant);
            db.close();
          });   
        });
}