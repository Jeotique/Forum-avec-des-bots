exports.GetById = (postId, server) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing query to fetch post with ID: ${postId}`);
        server.api.bdd.query('SELECT * FROM post WHERE ID_Post = ?', [postId], (err, result) => {
            if (err) {
                console.error('Error during query execution:', err);
                reject(err);
            } else {
                console.log('Query result:', result);
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};
