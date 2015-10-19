DBClient = {
    client: null,
    setupDB: function () {
        client = require('mongodb').MongoClient;
        var db;

        var dbURL = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD +
            '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME;
        if (process.env.OPENSHIFT_MONGODB_DB_USERNAME || process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
            dbURL = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME;
        }

        console.log(dbURL);

// Initialize connection once
        client.connect(dbURL, function (err, database) {
            if (err) throw err;

            db = database;

            console.log("connected to the DB");
        });
    }
}