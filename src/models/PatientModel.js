const mongodb = require('mongodb')

function PatientModel() {
    this.idDocument = mongodb.ObjectId()
}

function PatientModel(idDocument) {
    this.idDocument = mongodb.ObjectId(idDocument)
}

/*
json_schema:
{
    idDocument: string
}
*/
function PatientModel(json) {
    this.JSONDoc = JSON.parse(json)
    if (!this.JSONDoc.hasOwnProperty('idDocument')) throw error(console.error("idDocument is missing"));

    this.idDocument = mongodb.ObjectId(this.JSONDoc.idDocument)
}

module.exports = PatientModel