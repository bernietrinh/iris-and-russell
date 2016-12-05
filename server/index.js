'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// models
var Rsvp = require('./models/rsvp');

// TODO: move to config?

// database config
const config = {
    port : process.env.PORT || 3000, // set our port,
    url : 'mongodb://btrinh:password123@ds019836.mlab.com:19836/iris-and-wedding'
};

console.log('Database in use: ' + process.env.NODE_ENV); //log environment
mongoose.connect(config.url); // connect to our mongoDB database

// mongoose ================================================
//monitoring connection
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + config.url);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});

//disconnecting db
var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close((function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    }));
};

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(cookieParser());

// TODO: move to a controller
// routes ================================================
app.get('/api/rsvps', function (req, res) {

    rsvp.find(function (err, users) {

        if (err) res.send(err).status(500);

        res.json(users).status(200);
    });
});

app.post('/api/rsvp', function (req, res) {

    // create new instance of rsvp
    var rsvp = new Rsvp(req.body);

    // save object to db
    rsvp.save(function (err) {

        if (err) {
            console.log('error');
            res.sendStatus(400);
        }

        console.log("saved in db");
        res.sendStatus(200);

    });

});

app.delete('/api/rsvps/:rsvpId', function (req, res) {

});


app.listen(config.port, function () {
    console.log('Example app listening on port 8080!');
});

const clientPath = __dirname + "/../client/";
const scriptPath = __dirname + '/../node_modules/';
const uibPath = __dirname + '/../node_modules/angular-bootstrap-npm/dist/template';

app.use("/", express.static(clientPath));
app.use('/scripts', express.static(scriptPath));
app.use('/template', express.static(uibPath));

app.get('/', function(req, res) {

    res.render('index.html', { root: clientPath });
});

module.exports = app;