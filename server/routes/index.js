var express = require('express');
var router = express.Router();

const JSON = require('JSON');
var redis = require('../redis.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/writePost', (req, res) => {
  console.log('post request');
  console.log(req.body);
  redis.client.zadd("section1", 0, JSON.stringify(req.body), function (err, obj) {
      if (err) throw(err);
      res.send('succ');
  });
});

router.post('/upvote', (req, res) => {
  console.log('upvote request');
  console.log(req.body);
  redis.client.zincrby("section1", 1, req.body.key, function (err, obj) {
      if (err) throw(err);
      res.send('succ');
  });
});

router.get('/timeline', (req, res) => {
  //console.log('get request');
  redis.client.zrevrange("section1", 0, -1, 'WITHSCORES', function (err, obj) {
      if (err) throw(err);
      res.send(obj);
  });
});

module.exports = router;
