exports.GetById = (id, server) => {
    return new Promise((resolve, reject) => {
        console.log('Fetching post with ID:', id); // Journal de débogage
        server.api.bdd.query('SELECT * FROM post WHERE ID_Post = ?', [id], (err, result) => {
            if (err) {
                console.error('Error fetching post:', err); // Journal de débogage
                reject(err);
            } else {
                console.log('Post fetched successfully:', result); // Journal de débogage
                resolve(result[0]);
            }
        });
    });
};
