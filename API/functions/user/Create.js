exports.Create = (id, username, displayName, email, hashedPassword, receivemails, server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('INSERT INTO users (ID, username, displayName, email, password, receivemails) VALUES (?, ?, ?, ?, ?, ?)', [id, username, displayName, email, hashedPassword, receivemails], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
