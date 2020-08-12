const mongodb = require('mongodb')
const AnamnesisModel = require('./AnamnesisModel')
const ClinicHistoryModel = require('./ClinicHistoryModel')
const ComplementariesModel = require('./ComplementariesModel')
const ListTreatmentModel = require('./ListTreatmentModel')

function PatientModel() {
    this.idDocument = mongodb.ObjectId()
    this.name = String
    this.lastName1 = String
    this.lastName2 = String
    this.address = String
    this.anamnesis = new AnamnesisModel()
    this.clinicHistory = new ClinicHistoryModel()
    this.complementaries= new ComplementariesModel()
    this.treatments = new ListTreatmentModel()
}

function PatientModel(idDocument, name){
    this.idDocument = idDocument
    this.name = name
}

function PatientModel(doc) {
    try{
        this.idDocument = mongodb.ObjectId(doc.idDocument)
        this.name = doc.name 
        this.lastName1 = doc.lastName1 
        this.lastName2 = doc.lastName2 
        this.address = doc.address 
        this.anamnesis = doc.anamnesis 
        this.clinicHistory = doc.clinicHistory 
        this.complementaries= doc.complementaries 
        this.treatments = doc.treatments 
    }catch(error){
        consolee.error(error)
    }
}

/*
json_schema:
{
    idDocument: string
}
*/

module.exports = PatientModel