const MongoClient = require('mongodb').MongoClient;
const config = require('config');

const test = require('assert');

// Connection url

const url = config.get('bck.dbConnectionURL');
const client = new MongoClient(url);
// Database Name

// Connect using MongoClient
exports.getAllPatientsHandler = async (event) => {
    try {
        await client.connect();
    
        const database = client.db("clinica");
        const collection = database.collection("pacientes");
    
        console.log("Conected to MongoDB")
    
        const cursor = collection.find();
    
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }

        var body=[]
        for await (const doc of cursor) {
            body.push(doc);
        }
        var response = {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify(body)
        };
        console.log("Response" + JSON.stringify(response))
        return response
    } finally {
        await client.close();
    }
    
}