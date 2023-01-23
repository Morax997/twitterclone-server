const express = require('express');
const {client} = require("../config/mongoDB");
const {ObjectId} = require("mongodb");
const {getTweetsCollection} = require("../db/getCollection");
const router = express.Router();


router.post('/create', function(req, res, next) {
  client.connect()
    .then(mongoClient => {
      getTweetsCollection(mongoClient).insertOne(req.body)
        .then(response => {
          if (response.acknowledged) {
            getTweetsCollection(mongoClient).find().toArray()
              .then(tweets => {
                res.send(tweets);
              })
          }
        })
    })
});


router.post('/delete', function(req, res, next) {
  client.connect()
    .then(mongoClient => {
      getTweetsCollection(mongoClient).deleteOne({"_id": ObjectId(req.body.deleteID)})
        .then(response => {
          res.send(response);
        })
    })
});

router.get('/', function(req, res, next) {
  client.connect()
    .then(mongoClient => {
      getTweetsCollection(mongoClient).find().toArray()
        .then(tweets => {
          res.send(tweets);
        })
    })
});

module.exports = router;
