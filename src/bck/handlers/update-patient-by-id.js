const config = require('config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var UpdatePatientModel = require('../../models/UpdatePatientModel')

// Connection params

const url = process.env.CLUSTER_URL;
const dbName = config.get("dbSchema.clinicDB.name")
const collectionName = config.get("dbSchema.clinicDB.collections.patients.name")

exports.updatePatientByIdHandler = async (event, context)=>{    
    var updatePatientData = new UpdatePatientModel(JSON.parse(event.body))

    const client = new MongoClient(url,{ useUnifiedTopology: true });   
    await client.connect();    
    const collection = client.db(dbName).collection(collectionName);
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
        headers: JSON.stringify(new HeaderModel("allow-all"))
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