function HeaderModel(type, add){
    header = new Object();
    switch (type){
        case "allow-all":
            header= {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                "Access-Control-Allow-Headers":"*"
            };
    }
    return Object.assign(header,{"Content-Type":"application/json"},add)
}

module.exports = HeaderModel;