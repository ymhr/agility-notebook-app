const express = require('express');
const path = require('path');

const app = express();
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, '/dist/'));

app.use(publicPath);
// app.use('/', function(_, res){res.sendFile(indexPath)});

app.listen(8080);
console.log('Listening on 8080');
