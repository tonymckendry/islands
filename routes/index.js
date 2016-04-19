require('dotenv').load()
var express = require('express');
var router = express.Router();
// var knex = require('../db/knex');
var fs = require('fs')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
