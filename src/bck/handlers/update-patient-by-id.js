const config = require('config');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const url = config.get('bck.dbConnectionURL');
const client = new MongoClient(url);

exports.updatePatientById = async (event, context)=>{
    const data = JSON.parse(event.body); 
    
    if (!data.hasOwnProperty('idDocument')) return console.error("idDocument is missing");
    if (!data.hasOwnProperty('fieldToChange')) return console.error("fieldToChange is missing");
    if (!data.hasOwnProperty('newValues')) return console.error("fieldToChange is missing");
    if (!(data.fieldToChange.length == data.newValues.length)) return console.error("fieldToChange and newValues no same lenght");
    
    const id =data.idDocument;
    const fieldsToChange = data.fieldToChange;
    const newValues = data.newValues;

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