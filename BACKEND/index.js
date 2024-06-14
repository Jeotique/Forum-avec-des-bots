const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const { resolve } = require("path");
const path = require('path');
const Api = require('../API');
const routes = require('./routes');

module.exports = class Server {
    constructor() {
        this.init();
    }

    init() {
        this.api = new Api(this);
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.set('view engine', 'ejs');
        this.app.engine("html", ejs.renderFile);
        this.app.use("/assets", express.static(resolve(`./FRONTEND/assets`)));
        this.app.set('views', path.join(__dirname, '../FRONTEND/templates'));
        this.routes = new routes(this);
        this.app.listen(config.server.port, () => {
            console.log(`Server is running on ${config.server.url}:${config.server.port}`);
        });
    }

    renderTemplate(res, req, template, data = {}){
        const baseData = {
            path: req.path,
            user: null,
            hoster: `${config.server.url}:${config.server.port}`,
            categories: []
        };
        res.render(template, Object.assign(baseData, data));
    };
}