//
// presents.js
//
// Handles presents list related requests
//
var express = require('express');
var router = express.Router();
//var logger = require('../lib/logger.js');
var presents = require('../lib/presents.js');

router.get('/', function(req, res){
    //
    // Retrieve all present lists
    //
    presents.find(req, function(err, presents){
        res.json(presents);
    });
});

router.post('/', function(req, res) {
presents.add(req.body, function(err, result) {
		if (err)
		{
			res.status(500).send(err.message);
		}
		else
		{
			res.status(200).send(result);
		}
	});
});


/*
router.get('/:product_id', function(req, res){
    // Get a specific product
    product.findOne(req.params.product_id, function(err, product){
        res.json(product);
    });
});

router.get('/url/:category/:product', function(req, res){
    // Get a specific product by URL
    console.log('get by url');
    product.findUrl('/' + req.params.category + '/' + req.params.product, function(err, product){
        res.json(product);
    });
});
*/

module.exports = router;