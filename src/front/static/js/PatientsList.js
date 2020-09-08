import React from 'react'

function PatientsList(props){
    const patients = props.patients.map((patient, index)=>{
        return <li key = {patient._id}>{patient.name}</li>
    });
    return (
        <ul>
            {patients}
        </ul>
    )

}

export default PatientsList; 