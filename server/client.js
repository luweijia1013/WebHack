'use strict';

let http = require('http');
let querystring = require('querystring');
let HOST = 'localhost';
let PORT = 8080;

let username = 'lwja';
let password = 'a987654321';
http.get({
    'host':'localhost',
    path:'/?tag=login&username='+username+'&password='+password,
    port:8080},function(res){
    res.setEncoding('utf-8');
    res.on('data',function(data){
        console.log('服务器相应回来的数据为：'+data);
    })
})

// http.post({
//
// })


//
// let client = http.request(options, function() {
//     console.log('Connected to the server.');
//     client.write('localhost:8080');
// });
//
// client.on('data', function(data) {
//     console.log('**'+ data.toString());
//     client.end();
// });
//
// client.on('end', function() {
//     console.log('Server disconnected.');
//     console.log();
// });