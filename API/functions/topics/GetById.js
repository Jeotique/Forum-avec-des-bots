exports.GetById = (id, userId, server) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT topics.*, users.ID as userId, users.username
            FROM topics
            LEFT JOIN users on topics.userId = users.ID
            WHERE topics.ID_Topic = ?
        `;
        console.log(query, [id], userId);
        server.api.bdd.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};
