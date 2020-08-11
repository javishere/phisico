const config = require('config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var UpdatePatientModel = require('../../models/UpdatePatientModel')

const url = config.get('bck.dbConnectionURL');


exports.updatePatientByIdHandler = async (event, context)=>{
    const client = new MongoClient(url,{ useUnifiedTopology: true });
    var updatePatientData = new UpdatePatientModel(event.body) 
   
    await client.connect();
    
    const database = client.db("clinica");
    const collection = database.collection("pacientes");

    console.log("Conected to MongoDB")

    const filter = { _id: updatePatientData.idDocument};
        
    const updateDocument = {
        $set: {
        },
    };

    await updatePatientData.fieldsToChange.forEach((field, index) => {
        updateDocument.$set[field.toString()]=updatePatientData.newValues[index]
    });

    var response = {
        headers: {
            "Content-Type": "application/json"
        }
    };


    await collection.updateOne(filter, updateDocument).then(
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
    ).then(client.close());

    return response

}