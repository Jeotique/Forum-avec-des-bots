exports.Create = (content, userId, postId, server) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO reponse (Contenu, Date_De_Réponse, ID_Utilisateur, ID_Post) VALUES (?, NOW(), ?, ?)';
        server.api.bdd.query(query, [content, userId, postId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};
