exports.GetByTopicId = (topicId, server) => {
    return new Promise((resolve, reject) => {
        server.api.bdd.query('SELECT * FROM post WHERE ID_Topic = ?', [topicId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
