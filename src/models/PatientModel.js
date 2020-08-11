function PatientModel() {
    this.idDocument = String
}

function PatientModel(idDocument) {
    this.idDocument = idDocument
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

    this.idDocument = this.JSONDoc.idDocument
}

module.exports = PatientModel