var express = require('express');
var router = express.Router();
var models = require('../models');
var dbcfg = require('../config/db.json');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.loadQuoteData(dbcfg, (err, result) => {
    if (err) throw err;
    res.render('index', { arbitrage: result[0] });
  });
});

router.get('/fetchlatestquote', function(req, res, next) {
  //fetch quote data from CoinApi.io and store it in MySQL Db
  var options = {
    uri : 'https://rest.coinapi.io/v1/quotes/current',
    method : 'GET',
    headers : { 'X-CoinAPI-Key' : '6CB748F6-1F37-4A18-85F1-D0DE44559047' }
  };
  request(options, function (error, response) {
    if (error) throw error;
    quotes = JSON.parse(response.body);
    models.truncateQuoteData(dbcfg, (e, r) => {
      if (e) throw e;
      models.storeQuoteData(dbcfg, quotes, (err, result) => {
        if (err) throw err;
        res.redirect('/')
      });
    });
  });
});

module.exports = router;
