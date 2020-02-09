const mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nayera:1234@cluster0-dwvui.mongodb.net";

exports.addVote = function(req, serverRes) {
    MongoClient.connect(url, function(err, db) {
        if (err) //connection error
        {
          res.status(500).send("Weak Internet Connection");
        } 
        var dbo = db.db("Fattarny");
        var newVote = { 
            user_id: req.body.user_id,
            id: req.body.id,
            date: req.body.date};
        dbo.collection("votesHistory").insertOne(newVote, function(err, res) {
          if (err)
          {
            res.status(500).send("Weak Internet Connection");
          }
          else
          {
            serverRes.status(200).send("okay");
          }         
          db.close();
        });
      });
};