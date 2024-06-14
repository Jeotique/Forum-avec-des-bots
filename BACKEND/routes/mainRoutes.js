const express = require('express');
const execution = require('../execution');

module.exports = class mainRoutes {
    constructor(server) {
        this.server = server;
        this.init();
    }

    init() {
        this.router = express.Router();
        this.router.get('/', (req, res) => execution.getExec.Home(req, res, this.server));
        this.router.get('/register', (req, res) => execution.getExec.Register(req, res, this.server));
        this.router.post('/register', (req, res) => execution.postExec.Register(req, res, this.server));
        this.router.get('/login', (req, res) => execution.getExec.Login(req, res, this.server));
        this.server.app.use('/', this.router);
    }

}
