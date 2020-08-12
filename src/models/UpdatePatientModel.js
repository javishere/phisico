const PatientModel = require("./PatientModel")

function UpdatePatientModel() {
    PatientModel.call(this)
    
    this.fieldsToChange = []
    this.newValues = []
}

function UpdatePatientModel(idDocument, fieldsToChange, newValues) {
    PatientModel.call(this,idDocument)

    try{
        this.fieldsToChange = fieldsToChange instanceof Array ? fieldsToChange : [fieldsToChange]
        this.newValues = newValues instanceof Array ? newValues : [newValues]
    }catch(error){
        console.error(error)
    }
}
/*
json_schema:
{
    idDocument: string,
    fieldsToChange: [],
    newValues:[]
}
*/

function UpdatePatientModel(doc) {
    this.doc = doc
    PatientModel.call(this, this.doc)    

    if (!(this.doc.fieldsToChange.length == this.doc.newValues.length)) throw error("fieldToChange and newValues no same lenght");
    try{
        this.fieldsToChange = this.doc.fieldsToChange instanceof Array ? this.doc.fieldsToChange : [this.doc.fieldsToChange]
        this.newValues = this.doc.newValues instanceof Array ? this.doc.newValues : [this.doc.newValues]
    }catch(error){
        console.error(error)
    }
}

module.exports = UpdatePatientModel