const PatientModel = require("./PatientModel");

function AddPatientModel (){
    PatientModel.call(this);
    delete this.idDocument;
}

function AddPatientModel (doc){
    PatientModel.call(this, doc)
    delete this.idDocument
}

module.exports = AddPatientModel