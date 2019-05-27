// Server which delivers only static HTML pages (no content negotiation).
// Response codes: see http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// When the global data has been initialised, start the server.
'use strict';

let HTTP = require('http');
let FS = require('fs').promises;
let OK = 200, NotFound = 404, BadType = 415;
let sqlite3 = require('sqlite3');
let users_info_data = require('./usersInfoData.js');
start(8080);


//executeUsersinfo();

let net = require("net");

console.info('Server is running on port 8080');

let server = net.createServer(function (socket) {
    let client = socket.remoteAddress + ':' + socket.remotePort;
    console.log('Connected to' + client);
    socket.on('data', function (data) {
        console.log(data.toString());
        socket.write('Hello Client');
    });

    socket.on('end', function () {
        console.log('Client disconnected');
    });

    server.listen(8080, '127.0.0.1');
});

//execution of usersinfo database
function executeUsersinfo(){

    let database_user = users_info_data.openUsersInfoDatabase();
    // users_info_data.insertUsersBasic(-1,'\'lwjabcd\'','\'a987654321\'','\'42@qq.com\'');


    // TODO:create&insert can't be done in one time -BUG
    // users_info_data.createTable('test2', attributes, notes);
    // users_info_data.insertGeneral('test2',values);
    users_info_data.updateUsersBasic(1,'','jy@qq.com')

    //TODO:cant get return value -BUG asynchronous problem - promise, callback function
    users_info_data.getAllUsersBasic();
    // console.log('****' + result);


    users_info_data.closeUsersInfoDatabase();

}



// Provide a service to localhost only.
function start(port) {
    let service = HTTP.createServer(handle);
    try { service.listen(port, 'localhost'); }
    catch (err) { throw err; }
    console.log("Visit localhost:" + port);
}

// Deal with a request.
async function handle(request, response) {
    let url = request.url;
    if (url.endsWith("/")) url = url + "index.html";
    if (! url.endsWith(".html")) return fail(response, BadType, "Not .html");
    let file = "" + url;
    let content;
    try { content = await FS.readFile(file); }
    catch (err) { return fail(response, NotFound, file + " Not found"); }
    reply(response, content);
}

// Send a reply.
function reply(response, content) {
    let hdrs = { 'Content-Type': 'application/xhtml+xml' };
    response.writeHead(OK, hdrs);
    response.write(content);
    response.end();
}

// Send a failure message
function fail(response, code, message) {
    let hdrs = { 'Content-Type': 'text/plain' };
    response.writeHead(code, hdrs);
    response.write(message);
    response.end();
}

