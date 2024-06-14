const mainRoutes = require('./mainRoutes');

module.exports = class routes {
    constructor(server) {
        this.server = server;
        this.init();
    }

    init() {
        new mainRoutes(this.server);
    }
}