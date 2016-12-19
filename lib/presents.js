var logger = require('../lib/logger.js');
var config = require('../config.js');
//var ObjectID = require('mongodb').ObjectID;
var database = require('../lib/db.js');
var db = database.connection();
//var discount = require('../lib/discount.js');

module.exports = {
    find: function(req, callback){
    	logger.info('Retrieving all present lists');
        var databaseUrl = 'dbs/' + process.env.DocDBName;
        var collectionUrl = databaseUrl + '/colls/' + process.env.DocDBCollection;
        var data = db.readDocuments(collectionUrl).toArray(function (err, docs) {
            if (err) {
                callback(err, null);
            
            } else {
                logger.info(docs.length + ' present list documents found');
                callback(null, docs);
            }
        });
    },
    findById: function(presentListId, callback){
    	logger.info('Retrieving present list with id ' + presentListId);
        var databaseUrl = 'dbs/' + process.env.DocDBName;
        var collectionUrl = databaseUrl + '/colls/' + process.env.DocDBCollection;
        var documentUrl = collectionUrl + "/docs/" + presentListId
        var data = db.readDocument(documentUrl, function (err, docs) {
            if (err) {
                callback(err, null);
            
            } else {
                logger.info('Present list document with _self identifier of ' + docs._self + ' found');
                callback(null, docs);
            }
        });
    },
    add: function(list, callback){
        logger.info("Adding present list to database");
        logger.info(list);
        var databaseUrl = 'dbs/' + process.env.DocDBName;
        var collectionUrl = databaseUrl + '/colls/' + process.env.DocDBCollection;
        var data = db.createDocument(collectionUrl, list, function (err, document) {
            if (err) {
                console.log(err);

            } else {
                //console.log('created ' + document.id);
                callback(null, document);
            }
        });
    }
};