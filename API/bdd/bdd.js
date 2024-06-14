const mysql = require('mysql2');
const config = require('../../config');

module.exports = class Bdd {
    constructor() {
        this.connect();
    }

    connect() {
        this.connection = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.pass,
            database: config.database.bdd
        });
        console.log('Connected to database');
    };
};