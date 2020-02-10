const MongoClient = require('mongodb').MongoClient;

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;

exports.addVote = function(req, res) {
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) //connection error
          res.status(500).send("Weak Internet Connection");

        var dbo = db.db(dbName);
        var newVote = { 
            user_id: req.body.user_id,
            id: req.body.id,
            date: req.body.date};
        dbo.collection("votesHistory").insertOne(newVote, function(err, vote) {
          if (err)
            res.status(500).send("Weak Internet Connection");
          else
            res.status(200).send("Okay");      
          db.close();
        });
      });
};
