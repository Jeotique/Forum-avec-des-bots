exports.Authenticate = (identifier, password, server) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?';
        server.api.bdd.query(query, [identifier, identifier, password], (err, result) => {
            if (err) {
                console.error('Database error:', err); // Journal de débogage
                reject(err);
            } else {
                console.log('Database query result:', result); // Journal de débogage
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};
