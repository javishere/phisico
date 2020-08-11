const PatientModel = require("./PatientModel")

function UpdatePatientModel() {
    PatientModel.call(this)
    
    this.fieldsToChange = []
    this.newValues = []
}

function UpdatePatientModel(idDocument, fieldsToChange, newValues) {
    PatientModel.call(this,idDocument)

    this.fieldsToChange = fieldsToChange instanceof Array ? fieldsToChange : [fieldsToChange]
    this.newValues = newValues instanceof Array ? newValues : [newValues]
}
/*
json_schema:
{
    idDocument: string,
    fieldsToChange: [],
    newValues:[]
}
*/

function UpdatePatientModel(json) {
    PatientModel.call(this, json)

    this.JSONDoc = JSON.parse(json)

    if (!this.JSONDoc.hasOwnProperty('fieldsToChange')) throw error("fieldToChange is missing");
    if (!this.JSONDoc.hasOwnProperty('newValues')) throw error("fieldToChange is missing");
    if (!(this.JSONDoc.fieldsToChange.length == this.JSONDoc.newValues.length)) throw error("fieldToChange and newValues no same lenght");

    this.fieldsToChange = this.JSONDoc.fieldsToChange instanceof Array ? this.JSONDoc.fieldsToChange : [this.JSONDoc.fieldsToChange]
    this.newValues = this.JSONDoc.newValues instanceof Array ? this.JSONDoc.newValues : [this.JSONDoc.newValues]
}

module.exports = UpdatePatientModel