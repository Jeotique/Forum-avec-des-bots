exports.Create = (title, description, userId, server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('INSERT INTO topics (title, description, userId) VALUES (?, ?, ?)', [title, description, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
