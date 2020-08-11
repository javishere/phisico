const config = require('config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var UpdatePatientModel = require('../../models/UpdatePatientModel')

const url = config.get('bck.dbConnectionURL');
const client = new MongoClient(url);

exports.updatePatientById = async (event, context)=>{
    var updatePatientData = new UpdatePatientModel(event.body) 
    
    const id =updatePatientData.idDocument;
    const fieldsToChange = updatePatientData.fieldsToChange;
    const newValues = updatePatientData.newValues;

    await client.connect();
    
    const database = client.db("clinica");
    const collection = database.collection("pacientes");

    console.log("Conected to MongoDB")

    const filter = { _id: mongodb.ObjectId(id) };
        // update the value of the 'z' field to 42
    const updateDocument = {
        $set: {
        },
    };

    await fieldsToChange.forEach((field, index) => {
        updateDocument.$set[field.toString()]=newValues[index]
    });

    var response = {
        headers: {
            "Content-Type": "application/json"
        }
    };


    const result = await collection.updateOne(filter, updateDocument).then(
        res => {
            console.log(`Updated ${res.result.n} documents`)
            response.statusCode= 200
            response.body= JSON.stringify(res.result)
        },
        err => {
            console.error(`Something went wrong: ${err}`)
            response.statusCode= 500
            response.body= JSON.stringify(err.error)
        },
    );

    return response

}