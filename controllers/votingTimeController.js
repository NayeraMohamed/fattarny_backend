const MongoClient = require('mongodb').MongoClient;

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;

exports.update_start_time = function(req, res) {
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) //connection error
          return res.status(500).send("Weak Internet Connection");

        var dbo = db.db(dbName);
        var myquery = { start_time: /^0/ };
        var newvalues = {$set: {start_time: req.params.time} };
        dbo.collection("Voting_time").updateMany(myquery, newvalues, function(err, time) {
          console.log(time);
          if (err) return res.status(500).send("Weak Internet Connection");
          res.status(200).send(time[0]);
          db.close();
        });
      });
  };

  exports.get_start_time = function(req, res) {
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) //connection error
          return res.status(500).send("Weak Internet Connection");

        var dbo = db.db(dbName);
        dbo.collection("Voting_time").find({}).toArray(function(err, time) {
          if (err) return res.status(500).send("Weak Internet Connection");
          res.status(200).send(time[0]);
          db.close();
        });
      });
  };