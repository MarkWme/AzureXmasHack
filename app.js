"use strict";
var config = require('./config');
//
// node.js packages
//
var express = require('express');
var http = require('http');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var ejwt = require('express-jwt');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

/*
var DocumentClient = require('documentdb').DocumentClient;
var host = "https://" + config.database.host + ":" + config.database.port
var masterKey = config.database.key
var client = new DocumentClient(host, {masterKey: masterKey});

var databaseUrl = 'dbs/' + config.database.name;
var collectionUrl = databaseUrl + '/colls/' + config.database.collection;
var document = {
    'value': "Hello DocDb"
};

client.createDocument(collectionUrl, document, function(err, document) {
	if(err) return console.log(err);
	console.log('Created Document with content: ', document.content);
});
*/
var logger = require('./lib/logger.js'); 
logger.info('Starting: version 0.1');
var db = require('./lib/db.js');
//
// Establish database connection
//
var host = "https://" + process.env.DocDBHost + ":" + process.env.DocDBPort;
var masterKey = process.env.DocDBKey;
db.connect(host, masterKey, function(){
	logger.info('Connected to database: '  + host, {'category': 'database', 'type': 'success'});

	//
	// Routes
	//
	var presents = require('./routes/presents');

	//
	// Enable CORS support
	// 
	var corsOptions={
			origin: 'http://localhost:3020',
			credentials: true
	};
	app.use(cors(corsOptions));

	//
	// Set application port
	//
	app.set('port', process.env.PORT || 3000);
	//app.set('jwtSecret', config.secret);

	app.disable('x-powered-by');

	//
	// Logging
	//

	logger.stream = { 
		write: function(message, encoding){ 
		logger.info(message, {'category': 'stream' }); 
		} 
	};

	//
	// Temporarily commented out below to remove noise from the logs
	// 
	// May need to route this elsewhere in the final version
	// 

	app.use(require("morgan")("combined", { "stream": logger.stream }));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	//app.use(cookieParser());
	//app.use(express.static('public'));

	app.use('/api/presents', presents);

	// 404 page
	app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
	});

	// 500 page
	app.use(function(err, req, res, next){
		console.log('smeg');
		console.error(err.stack);
		if (err.name === 'UnauthorizedError') {
			res.status(401).send('Invalid Token (' + err.message + ')');
		} else {
			res.type('text/plain');
			res.status(500).send('Server Error: ' + err.message);
		}
	});

	http.createServer(app).listen(app.get('port'), function(){
		logger.info('Express server started on http://localhost:'  + app.get('port'), {'category': 'server', 'type': 'success'});
	});

});