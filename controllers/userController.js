const mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nayera:1234@cluster0-dwvui.mongodb.net";

exports.login = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) //connection error
        {
          res.status(500).send("Weak Internet Connection");
        } 
        var dbo = db.db("Fattarny");
        dbo.collection("Users").findOne({user_id: req.body.user_id}, function(err, user) {
          if (err)
          {
            return res.status(500).send("Weak Internet Connection");;
          } 
          if(user == null) 
          {
            res.status(401).send("Authentication Error");
          }
          else
          {
            if(req.body.password == user.password)
            {
              res.status(200).send(user);
            }
            else
            {
              res.status(401).send("Authentication Error");
            }
          }         
          db.close();
        });
      });
};

exports.register = function(req, res) {
  MongoClient.connect(url, function(err, db) {
      if (err) //connection error
      {
        return res.status(500).send("Weak Internet Connection");
      } 
      var dbo = db.db("Fattarny");
      dbo.collection("Users").findOne({user_id: req.body.user_id}, function(err, user) {
        if (err)
        {
          res.status(500).send("Weak Internet Connection");
        } 
        if(user != null) 
        {
          res.status(401).send("User with the same id already exists");
        }
        else
        {
          var newUser = { 
           user_id: req.body.user_id,
           email: req.body.email,
           password: req.body.password,
           is_admin:req.body.is_admin,
           order: []};
          dbo.collection("Users").insertOne(newUser, function(err, user) {
            if (err)
            {
              res.status(500).send("Weak Internet Connection");
            } 
            else
            {
              res.status(200).send(newUser);
            }
          });
        }         
        db.close();
      });
    });
};