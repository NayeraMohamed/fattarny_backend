const MongoClient = require('mongodb').MongoClient;

const validations = require('../validations');

const constants = require('../constants');
const dbConnectionString = constants.dbConnectionString;
const dbName = constants.dbName;

exports.login = function(req, res) {
    MongoClient.connect(dbConnectionString, function(err, db) {
        if (err) 
          return res.status(500).send("Weak Internet Connection");

        var dbo = db.db(dbName);
        dbo.collection("Users").findOne({user_id: req.body.user_id}, function(err, user) {
          if (err)
            return res.status(500).send("Weak Internet Connection");

          if(user == null) 
            res.status(401).send("Authentication Error");
          else
          {
            if(req.body.password == user.password)
              res.status(200).send(user);
            else
              res.status(401).send("Authentication Error");
          }         
          db.close();
        });
      });
};

exports.register = function(req, res) {
  var new_user = req.body;
  var validationResponse = validations.validate_user(new_user);

  if(!validationResponse.isValid)
    return res.status(400).send(validationResponse.message);
  
  MongoClient.connect(dbConnectionString, function(err, db) {
    if (err) //connection error
      return res.status(500).send("Weak Internet Connection");

    var dbo = db.db(dbName);
    dbo.collection("Users").findOne({user_id: req.body.user_id}, function(err, user) {
      if (err)
        return res.status(500).send("Weak Internet Connection");

      if(user != null) 
        res.status(401).send("User with the same id already exists");
      else
      {
        var newUser = { 
          user_id  : req.body.user_id,
          email    : req.body.email,
          password : req.body.password,
          is_admin : req.body.is_admin,
        };
        dbo.collection("Users").insertOne(newUser, function(err, user) {
          if (err)
            res.status(500).send("Weak Internet Connection");
          else
            res.status(200).send(newUser);
        });
      }         
      db.close();
    });
  });
};