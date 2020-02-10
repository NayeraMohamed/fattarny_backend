const MongoClient = require('mongodb').MongoClient;

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;

exports.getTodaysWinner = function(req, res) {
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) //connection error
          return res.status(500).send("Weak Internet Connection");

        var dbo = db.db(dbName);
        dbo.collection("winnerRestaurants").findOne({date: req.params.date}, function(err, winner) {
          if (err)
            res.status(500).send("Weak Internet Connection");

          if(winner != null) 
            res.status(200).send(winner);

          else
          {
            var query = {date: req.params.date};
            dbo.collection("votesHistory").find(query).toArray(function(err, result) {
              if (err) res.status(500).send("Weak Internet Connection");
              else 
              {
                if(result.length > 0)
                {
                  for(var i = 0; i < result.length; i++) {
                    var obj = result[i];
                    var rest = new Map();
                    if(rest.has(obj.id)) {rest.set(obj.id, rest.get(obj.id)+1);}
                    else {rest.set(obj.id, 1);}
                }
                var max = -1;
                var winnerId;
                var value;
                for (var [k, v] of rest) {
                  if(v > max){
                      max = v;
                      winnerId = k;
                  }
                }
                var newWinner = { 
                    id: winnerId,
                    date: req.params.date};
                dbo.collection("winnerRestaurants").insertOne(newWinner, function(err, r) {
                    if (err)
                      res.status(500).send("Weak Internet Connection");
                    else
                      res.status(200).send(newWinner);

                    db.close();
                  });  
                }      
                else
                {
                  var newWinner = { 
                    id: "0",
                    date: req.params.date};
                  res.status(200).send(newWinner);
                  db.close();
                }      
              }
            });          
          }         
        });
      });
};