'use strict';
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const { readdirSync } = require("fs");

var configureExpressApp = function(app) {
    return new Promise((resolve, reject) => {
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: '500mb',
            parameterLimit: 50000
        }));
        app.use(bodyParser.json({ limit: '500mb' }));
        app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*'); //Enable CORS
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Permissions');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
        useAdditionalMiddleware(app);
        resolve();
    });
};

function useAdditionalMiddleware(app) {
    app.use(morgan(config.LOG_TYPE));
    readdirSync("./src/v1/router").map((r) => app.use("/api/", require("./v1/router/" + r)));
    app.use(errorHandler);
}

function errorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(400).send(err);
    }
    return res.status(500).send(err);
}

module.exports = {
    configureExpressApp: configureExpressApp
};