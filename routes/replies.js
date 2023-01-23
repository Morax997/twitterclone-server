const express = require('express');
const {client} = require("../config/mongoDB");
const {ObjectId} = require("mongodb");
const {getRepliesCollection} = require("../db/getCollection");
const router = express.Router();


router.post('/create', function(req, res, next) {
  client.connect()
    .then(mongoClient => {
      getRepliesCollection(mongoClient).insertOne({...req.body, tweetId: ObjectId(req.body.tweetId)})
        .then(response => {
          res.send(response);
        })
    })
});

router.post('/delete', function(req, res, next) {
  client.connect()
    .then(mongoClient => {
      getRepliesCollection(mongoClient).deleteOne({"_id": ObjectId(req.body.deleteID)})
        .then(response => {
          res.send(response);
        })
    })
});

router.get('/:tweetId', function(req, res, next) {
  client.connect()
    .then(mongoClient => {
      getRepliesCollection(mongoClient).find({tweetId: ObjectId(req.params.tweetId)}).toArray()
        .then(tweets => {
          res.send(tweets);
        })
    })
});

module.exports = router;
