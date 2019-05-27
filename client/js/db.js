'use strict';

let express = require('express');
let app = express();

app.use(express.static('${__dirname}/public'));

app.get('/api', function (req, res) {
    res.send((new Date()).toLocaleTimeString());
});

app.listen(8080)