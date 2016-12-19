(function(){
    var DocumentClient = require('documentdb').DocumentClient;
    var dbConnection;
 
    module.exports =  {
        connect: function(dbHost, dbMasterKey, callback) {
            //var host = "https://" + process.env.DocDBHost + ":" + process.env.DocDBPort;
            //var masterKey = process.env.DocDBKey;
            var client = new DocumentClient(dbHost, {masterKey: dbMasterKey});
            dbConnection = client;
            callback();
            /*
            MongoClient.connect(dbUrl,
                function(err, database){
                    dbConnection = database;
                    if(callback) { callback(); }
                });
            */
        },
        db: function() {
            return dbConnection;
        },
        connection: function() {
            return dbConnection;
        },
        close: function() {
            dbConnection.close();
        },
        
    };
})();