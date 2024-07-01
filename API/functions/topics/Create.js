exports.Create = (title, description, tags, userId, server) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO topics (title, description, tags, userId, etat, createdAt) VALUES (?, ?, ?, ?, "ouvert", NOW())';
        server.api.bdd.query(query, [title, description, tags, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};
