exports.GetById = (id, server) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT topics.*, users.username
            FROM topics
            JOIN users ON topics.userId = users.ID
            WHERE topics.ID_Topic = ?
        `;
        server.api.bdd.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
};
