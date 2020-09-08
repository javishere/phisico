import fetch from 'isomorphic-fetch'

export default function getAllPatients(){
    return fetch('https://c9p5u8gzw7.execute-api.eu-west-1.amazonaws.com/Stage/clinica/getAllPatients')
        .then(res => res.json())
}