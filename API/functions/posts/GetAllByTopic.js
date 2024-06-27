exports.GetAllByTopic = (topicId, server) => {
    return new Promise((resolve, reject) => {
        console.log('Fetching posts for topic with ID:', topicId); // Journal de débogage
        server.api.bdd.query('SELECT * FROM post WHERE ID_Topic = ?', [topicId], (err, result) => {
            if (err) {
                console.error('Error fetching posts:', err); // Journal de débogage
                reject(err);
            } else {
                console.log('Posts fetched successfully:', result); // Journal de débogage
                resolve(result);
            }
        });
    });
};
