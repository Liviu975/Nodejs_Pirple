/*
*
*    Primary file of the API
*
*/


// Import the modules/dependencies
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
            pathname: trimmedPath,
            method,
            headers,
            queryStringObject,
            buffer
        }

        // Send the reponse
        return res.end(`${JSON.stringify(requestObj, ",", 2)}`);
    })
}

// Listen to the port
server.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else console.log(`The app is running on port ${PORT}`);
})

