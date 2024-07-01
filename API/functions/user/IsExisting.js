exports.IsExisting = (username, email, server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
}
