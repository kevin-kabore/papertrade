'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Stock = require('./model/Stock')

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

// db config
var mongoDB = 'mongodb://kevinkabore:secret-KEY@ds119091.mlab.com:19091/paperexchangedb'
mongoose.connect(mongoDB, {useMongoClient:true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/stocks')
  .get(function(req, res) {
    Stock.find(function(err, stocks) {
      if (err) {
        res.send(err)
      }
      res.json(stocks)
    })
  })
  .post(function(req, res){
    var stock = new Stock();
    stock.symbol = req.body.symbol
    stock.date = req.body.date
    stock.open = req.body.open
    stock.high = req.body.high
    stock.low = req.body.low
    stock.close = req.body.close
    stock.volume = req.body.volume


    stock.save(function(err) {
      if (err) {
        res.send(err)
      }
      res.json('Stock successfully posted')
    })
  })

router.route('/stocks/:stock_id')
  .put(function(req, res) {
    Stock.findById(req.params.stock_id, function(err, stock) {
      if (err) {
        res.send(err)
      }
      (req.body.quantity) ? stock.quantity = req.body.quantity : null;
      (req.body.purchase) ? stock.purchase = req.body.purchase : null;
      (req.body.selling) ? stock.selling = req.body.selling : null;

      stock.save(function(err) {
        if (err) {
          res.send(err)
        }
        res.json({message: 'Transaction Completed'});
      })
    })
  })
  .delete(function(req, res) {
    Stock.remove({_id: req.params.stock_id}, function(err, stock) {
      if (err) {
        res.send(err)
      }
      res.json({message: 'Stock successfully deleted'})
    })
  })
//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
