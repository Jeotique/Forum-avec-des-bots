exports.GetAllByPost = (postId, server) => {
    return new Promise((resolve, reject) => {
        console.log('Fetching responses for post with ID:', postId); // Journal de débogage
        server.api.bdd.query('SELECT * FROM reponse WHERE ID_Post = ?', [postId], (err, result) => {
            if (err) {
                console.error('Error fetching responses:', err); // Journal de débogage
                reject(err);
            } else {
                console.log('Responses fetched successfully:', result); // Journal de débogage
                resolve(result);
            }
        });
    });
};
