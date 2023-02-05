/*
*
*    Primary file of the API
*
*/


// Import the modules/dependencies
const { stat } = require("fs");
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// PORT variable
const PORT = 3000;

// Create a server
const server = http.createServer(handleServer);

// All server logic
function handleServer(req, res) {

    // Get the url and parse it
    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the http method of the request
    const method = req.method.toUpperCase();

    // Get the query string as an object
    let queryStringObject = parsedUrl.query;

    // Get the headers as an object
    let headers = req.headers;

    // Get the payload if there is any
    let decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Request data that we want
        const requestObj = {
            trimmedPath,
            method,
            headers,
            queryStringObject,
            payload: buffer
        }

        // Choose the handler
        let chosenHandler = typeof(Router[trimmedPath]) !== 'undefined' ? Router[trimmedPath] : handler.noFound;
    
        // Route the request to the handler specified in the router
        chosenHandler(requestObj, (statusCode, payload) => {
            // Use the default status code called back by the handler or 200 
            statusCode = typeof(statusCode) === "number" ? statusCode : 200;

            payload = typeof(payload) === "object" ? payload : {};

            let payloadString = JSON.stringify(payload);

            console.log(`Returning this response: ${statusCode}, ${payloadString}`);
            res.writeHead(statusCode);
            return res.end(payloadString);
        })
    })
}

// Listen to the port
server.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else console.log(`The app is running on port ${PORT}`);
})


// Define handlers
const handler = {};

handler.sample = function(data, callback) {
    // Callback a http status code and a payload object
    callback(406, {'name': 'Sample handler'});
}


// Not found handler
handler.noFound = function (data, callback) {
    callback(404);
}

// Define a request router
const Router = {
    'sample': handler.sample
}