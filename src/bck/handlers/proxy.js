exports.handler = function(event, context, callback) {

   
    callback(null, {
        statusCode: '200',
        

        // API Gateway will automatically convert the base64 encoded response to binary if the Accept header in 
        // request matches the Content-Type of response. Unfortunately, if you use this in an HTML Image tag
        // <img src="https://your-api"/>, then browsers don't send a specific Accept header. Therefore API Gateway 
        // will return the base64 text response. If serving image in HTML tag is your primary usecase,
        // then you can use */* as value for BinaryMediaType which will make API Gateway treat every response
        // as binary type, and hence decode base64 always.
        
        headers: {
            "Access-Control-Allow-Origin": "*"
            
        }
    });

}