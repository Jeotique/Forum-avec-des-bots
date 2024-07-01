exports.GetAll = (server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('SELECT * FROM topics WHERE etat != "archived"', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
