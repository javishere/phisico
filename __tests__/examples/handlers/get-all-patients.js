const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const url = "mongodb+srv://Javier:physiolivia@cluster0.crtxs.mongodb.net/clinica?retryWrites=true&w=majority";

// Database Name

const dbName = 'test';
// Connect using MongoClient
exports.getAllPatientsHandler = (event) => {
    MongoClient.connect(url, function(err, client) {

        console.log("in")

        // Use the admin database for the operation
        
        const adminDb = client.db(dbName).admin();
        // List all the available databases
        
        adminDb.listDatabases(function (err, dbs) {

            test.equal(null, err);

            test.ok(dbs.databases.length > 0);

            client.close();

        });
        
    });
    console.log("out")
}