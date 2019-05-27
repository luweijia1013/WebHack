'use strict';

let net = require('net');
let HOST = '127.0.0.1';
let PORT = 8080;

let client = net.connect(PORT, HOST, function() {
    console.log('Connected to the server.');
    client.write('Hello Server!');
});

client.on('data', function(data) {
    console.log(data.toString());
    console.log();
    client.end();
});

client.on('end', function() {
    console.log('Server disconnected.');
    console.log();
});