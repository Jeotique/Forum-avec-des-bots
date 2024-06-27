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
        this.router.post('/login', (req, res) => execution.postExec.Login(req, res, this.server));
        this.router.post('/topics', (req, res) => execution.postExec.CreateTopic(req, res, this.server));
        this.router.get('/topics/:id', (req, res) => execution.getExec.Topic(req, res, this.server)); 
        this.router.post('/topics/:id/posts', (req, res) => execution.postExec.CreatePost(req, res, this.server)); 
        this.router.get('/posts/:id', (req, res) => execution.getExec.Post(req, res, this.server));
        this.router.post('/posts/:id/responses', (req, res) => execution.postExec.CreateResponse(req, res, this.server));
        this.server.app.use('/', this.router);
    }
}
