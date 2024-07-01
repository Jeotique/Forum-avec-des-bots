exports.GetById = (id, server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('SELECT * FROM topics WHERE ID_Topic = ?', [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};
