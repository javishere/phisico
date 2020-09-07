const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('config');
var PatientModel = require('../../models/PatientModel')

// Connection params

const url = process.env.CLUSTER_URL;
const dbName = config.get("dbSchema.clinicDB.name")
const collectionName = config.get("dbSchema.clinicDB.collections.patients.name")

exports.getAllPatientsHandler = async (event) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();    
    const collection = client.db(dbName).collection(collectionName);

    console.log("Conected to MongoDB")

    const cursor = collection.find();

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }

    var body = []
    for await (const doc of cursor) {
        body.push(doc);
    }

    await client.close();

    var response = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200,
        body: JSON.stringify(body)
    };
    console.log("Response" + JSON.stringify(response))
    return response


}

exports.getPatientByIdHandler = async (event) => {
    var patientData = new PatientModel(event.pathParameters);
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();  
    const collection = client.db(dbName).collection(collectionName);

    console.log("Conected to MongoDB")

    var query = {
        _id: patientData.idDocument
    }

    var cursor = await collection.findOne(query).then(client.close());

    var body = cursor || { data: "empty" }

    var response = {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: 200,
        body: JSON.stringify(body)
    };
    console.log("Response" + JSON.stringify(response))
    return response


}