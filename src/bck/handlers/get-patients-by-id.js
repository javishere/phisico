const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('config');

var PatientModel = require('../../models/PatientModel')

const test = require('assert');

// Connection url

const url = config.get('bck.dbConnectionURL');
const client = new MongoClient(url);
// Database Name

// Connect using MongoClient
exports.getAllPatientsByIdHandler = async (event) => {
    try {
        var PatientData = new PatientModel(event.body);

        await client.connect();
    
        const database = client.db("clinica");
        const collection = database.collection("pacientes");
    
        console.log("Conected to MongoDB")

        var query = {
            _id: mongodb.ObjectId(PatientData.idDocument)
        }
    
        const cursor = collection.findOne();
        
        var body=[]
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            body.push({
                data:"empty"
            })
        }else{
            body.push(cursor)
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