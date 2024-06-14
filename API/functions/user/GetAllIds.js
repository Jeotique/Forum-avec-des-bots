exports.GetAllIds = (server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('SELECT * FROM users', (err, result) => {
            if (err) {
                reject(err);
            } else {
                let i = [];
                result.forEach(r => i.push(r.id));
                resolve(i);
            }
        });
    });
}