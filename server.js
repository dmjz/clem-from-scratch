'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://' + process.env.IP + '/data', function(err, db) {
   
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected');
    }
    
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    
    routes(app, db);
    
    app.listen(process.env.PORT, process.env.IP, function() {
        console.log('Listening on port ' + process.env.PORT);
    });
    
});