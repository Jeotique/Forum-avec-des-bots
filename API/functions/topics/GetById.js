exports.GetById = (id, server) => {
    return new Promise((resolve, reject) => {
        console.log('Fetching topic with ID:', id); // Journal de débogage
        server.api.bdd.query('SELECT * FROM topics WHERE ID_Topic = ?', [id], (err, result) => {
            if (err) {
                console.error('Error fetching topic:', err); // Journal de débogage
                reject(err);
            } else {
                console.log('Topic fetched successfully:', result); // Journal de débogage
                resolve(result[0]);
            }
        });
    });
};
