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

module.exports = PatientModel