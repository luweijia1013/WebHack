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


// executeUsersinfo();

// let net = require("net");
//
//
// let server = net.createServer(function (socket) {
//     let client = socket.remoteAddress + ':' + socket.remotePort;
//     console.log('Connected to' + client);
//     socket.on('data', function (data) {
//         console.log(data.toString());
//         socket.write('Hello Client');
//     });
//
//     socket.on('end', function () {
//         console.log('Client disconnected');
//     });
//
//     server.listen(8080, '127.0.0.1');
// });

console.info('Server is running on port 8080');


//execution of usersinfo database
function executeUsersinfo(){

    let database_user = users_info_data.openUsersInfoDatabase();
    // users_info_data.insertUsersBasic(-1,'\'lwjabcd\'','\'a987654321\'','\'42@qq.com\'');


    // TODO:create&insert can't be done in one time -BUG
    // users_info_data.createTable('test2', attributes, notes);
    // users_info_data.insertGeneral('test2',values);
    // users_info_data.updateUsersBasic(1,'','jy@qq.com')

    // users_info_data.getAllUsersBasic((result)=>{
    //     result.forEach((row)=>{
    //         console.log(row);
    //     });
    // });

    users_info_data.checkUsersBasicValid((result)=>{
       console.log(result);
    }, 'lwja','a9876543s21');

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
    console.log('request coming!!');
    // let url = request.url;
    // if (url.endsWith("/")) url = url + "index.html";
    // if (! url.endsWith(".html")) return fail(response, BadType, "Not .html");
    // let file = "" + url;
    // let content;
    // try { content = await FS.readFile(file); }
    // catch (err) { return fail(response, NotFound, file + " Not found"); }
    let content;
    let paras = parseUrl(request.url);
    switch(paras.tag){
        case 'login':
            content = '0';
            //TODO: database should be 24-open or open-close every time visited
            users_info_data.openUsersInfoDatabase();
            users_info_data.checkUsersBasicValid((result)=>{
                if(result){
                    content = '1';
                }
                reply(response, content);
            }, paras.username, paras.password);
            users_info_data.closeUsersInfoDatabase();
    }
}

function parseUrl(url){
    // let result = [];
    let paraPart = url.split('?')[1];
    let paras = paraPart.split('&');
    let obj = {};
    paras.forEach((para)=>{
        let key = para.split('=')[0];
        let value = para.split('=')[1];
        obj[key] = value;
        // result.push(obj);
    });
    return obj;
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

