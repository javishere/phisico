const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const url = "mongodb+srv://Javier:physiolivia@cluster0.crtxs.mongodb.net/clinica?retryWrites=true&w=majority";

// Database Name

const dbName = 'clinica';
// Connect using MongoClient
exports.getAllPatientsHandler = (event) => {

    MongoClient.connect(url, function(err, client) {

        console.log("in")

        // Use the admin database for the operation
        
        const adminDb = client.db(dbName).admin();
        const pacientesCollection = adminDb.collection("pacientes")

        // Get all pacientes in collection

        pacientesCollection.find({}).toArray((err, result)=>{
            var code = 200;
            var result = result;
            if (err) {
                code = 400
                result= err
            };
            console.log(result);
            response = {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: code,
                body: JSON.stringify(result),
            };
            return response;
        });
        
    });
    console.log("out")
}