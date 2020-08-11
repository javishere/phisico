function UpdatePatientModel() {
    this.idDocument = String
    this.fieldsToChange = []
    this.newValues = []
}

function UpdatePatientModel(idDocument, fieldsToChange, newValues) {
    this.idDocument = idDocument
    this.fieldsToChange = fieldsToChange instanceof Array ? fieldsToChange : [fieldsToChange]
    this.newValues = newValues instanceof Array ? newValues : [newValues]
}

function UpdatePatientModel(json) {
    this.JSONDoc = JSON.parse(json)
    if (!this.JSONDoc.hasOwnProperty('idDocument')) throw error(console.error("idDocument is missing"));
    if (!this.JSONDoc.hasOwnProperty('fieldsToChange')) throw error("fieldToChange is missing");
    if (!this.JSONDoc.hasOwnProperty('newValues')) throw error("fieldToChange is missing");
    if (!(this.JSONDoc.fieldsToChange.length == this.JSONDoc.newValues.length)) throw error("fieldToChange and newValues no same lenght");

    this.idDocument = this.JSONDoc.idDocument
    this.fieldsToChange = this.JSONDoc.fieldsToChange instanceof Array ? this.JSONDoc.fieldsToChange : [this.JSONDoc.fieldsToChange]
    this.newValues = this.JSONDoc.newValues instanceof Array ? this.JSONDoc.newValues : [this.JSONDoc.newValues]
}

module.exports = UpdatePatientModel