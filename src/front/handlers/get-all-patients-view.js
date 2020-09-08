import React from 'react'
import {renderToString} from 'react-dom/server'
import PatientsList from '../static/js/PatientsList';
import getAllPatients from '../connections/patients';
import fs from 'fs';

// Connect using MongoClient
exports.getAllPatientsView = (event, context, callback) => {
    const index = fs.readFileSync(__dirname + '/../static/allPatientsView.html', 'utf8');
    return getAllPatients().then(patients => {
        html = renderToString(<PatientsList patients = {patients}/>);
        return index.replace('@@APP',html);
        //res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    });
}