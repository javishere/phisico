const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const url = "mongodb+srv://Javier:physiolivia@cluster0.crtxs.mongodb.net/clinica?retryWrites=true&w=majority";

// Database Name

const dbName = 'clinica';
// Connect using MongoClient
exports.getAllPatientsHandler =  (event) => {
    var code
    var response = {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: 200
    };

    MongoClient.connect(url, function(err, client) {

        console.log("in")

        // Use the admin database for the operation
        
        const adminDb = client.db(dbName);
        const pacientesCollection = adminDb.collection("pacientes")
        

        // Get all pacientes in collection

        pacientesCollection.find({}).toArray((err, result)=>{
            var res = result;
            if (err) {
                code = 400
                res= err
            };
            console.log(result);
            
            response["body"]=JSON.stringify(res);
        });
        
    });
    return response;
    console.log("out")
}