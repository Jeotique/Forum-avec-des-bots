exports.Create = (content, postId, userId, server) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing query to insert response for post with ID: ${postId}`);
        const query = 'INSERT INTO reponse (Contenu, Date_De_Réponse, ID_Utilisateur, ID_Post) VALUES (?, NOW(), ?, ?)';
        server.api.bdd.query(query, [content, userId, postId], (err, result) => {
            if (err) {
                console.error('Error during query execution:', err);
                reject(err);
            } else {
                console.log('Response inserted successfully');
                resolve(result.insertId);
            }
        });
    });
};
