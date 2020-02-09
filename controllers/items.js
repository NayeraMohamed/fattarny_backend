var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nayera:1234@cluster0-dwvui.mongodb.net";

const dbName = "Fattarny";
const tag = "Controller_Items";

exports.get_restaurant_items = (req, res) => {
    console.log(tag + "-get_restaurant_items-" + res);
    var restaurantId = parseInt(req.params.restaurant_id);
    
    MongoClient.connect(url, function(err, db) {
        console.log(tag + "-mongo_connection-error" + err);
         if (err) throw err;
         const dbo = db.db(dbName);
         var query = {restaurant_id : restaurantId};
         dbo.collection("Items").find(query).toArray(function(err, items) {
            console.log(tag + "-get_items-error-" + err);
            if (err) throw err;
            res.status(200).send(items);
            db.close();
          });   
        });
}

exports.get_total_sum = (req, res) => {
    console.log(tag + "-get_restaurant_items-" + res);
    //var selectedItems = req.params.selected_items;
    

    MongoClient.connect(url, function(err, db) {
        console.log(tag + "-mongo_connection-error" + err);
         if (err) throw err;
         const dbo = db.db(dbName);

         var arr = [{id: 1, qty:2},{id: 1, qty:2}]
         dbo.collection("Items").aggregate(
            [{
                $match: {
                    id: {
                        $in: [1, 2]
                    }
                }
            }]).toArray(
          function(err, data){
             if (err) {
                 console.log("heree");
                console.log(err.message);
             };
             console.log("heree2")
            console.log(data[0]);
         });
        });
}