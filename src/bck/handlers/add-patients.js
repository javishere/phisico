const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('config');

const test = require('assert');
const AddPatientModel = require('../../models/AddPatienModel');
const HeaderModel = require('../../models/HeaderModel')


// Connection params

const url = process.env.CLUSTER_URL;
const dbName = config.get("dbSchema.clinicDB.name")
const collectionName = config.get("dbSchema.clinicDB.collections.patients.name")


exports.addPatientHandler = async (event) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });  

    
    var patientData = new AddPatientModel(JSON.parse(event.body));
    var response = {
        headers: new HeaderModel("allow-all")
    }
    await client.connect().then(
                                cli => {
                                    console.log("Conected to MongoDB")
                                    return cli.db(dbName).collection(collectionName)          
                                }
                            ).then(
                                collec => {
                                    return collec.insertOne(patientData)
                                }
                            ).then(
                                res => {
                                    response.statusCode = 200
                                    response.body = JSON.stringify(res.result)
                                    console.log(res.result)
                                }
                            ).catch(
                                err =>{
                                    err.statusCode = 500
                                    response.body = JSON.stringify(err.error)
                                    console.error(err)
                                }
                            ).then(
                                client.close()
                            );

    return response

} 