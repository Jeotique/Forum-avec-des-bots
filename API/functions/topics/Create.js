exports.Create = (title, description, userId, tags, server) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing query to insert topic with title: ${title}`);
        const query = 'INSERT INTO topics (title, description, userId, tags, createdAt, etat) VALUES (?, ?, ?, ?, NOW(), "ouvert")';
        server.api.bdd.query(query, [title, description, userId, tags], (err, result) => {
            if (err) {
                console.error('Error during query execution:', err);
                reject(err);
            } else {
                console.log('Topic inserted successfully');
                resolve(result.insertId);
            }
        });
    });
};
