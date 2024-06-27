const Bdd = require('./bdd/bdd');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../config');
const functions = require('./functions');

module.exports = class Api {
    constructor(server) {
        this.server = server;
        this.init();
        this.bddManager = new Bdd();
        this.bdd = this.bddManager.connection;
        this.functions = functions;
    }

    init() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.listen(config.api.port, () => {
            console.log(`Server API is running on ${config.api.url}:${config.api.port}`);
        });
    }
}