exports.GetAll = (server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('SELECT * FROM topics WHERE etat != "archivé"', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
