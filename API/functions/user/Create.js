exports.Create = (id, username, displayName, email, password, receivemails, server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('INSERT INTO users (id, username, displayName, email, password, receivemails) VALUES (?, ?, ?, ?, ?, ?)', [id, username, displayName, email, password, receivemails], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}