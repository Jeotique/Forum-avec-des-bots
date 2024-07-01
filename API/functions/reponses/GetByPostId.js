exports.GetByPostId = (postId, server) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing query to fetch responses for post with ID: ${postId}`);
        server.api.bdd.query('SELECT * FROM reponse WHERE ID_Post = ?', [postId], (err, result) => {
            if (err) {
                console.error('Error during query execution:', err);
                reject(err);
            } else {
                console.log('Query result:', result);
                resolve(result);
            }
        });
    });
};
