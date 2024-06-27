exports.Create = (content, title, userId, topicId, server) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO post (Contenu, Titre, Date_de_création, Etat, ID_Topic, ID_Utilisateur) VALUES (?, ?, NOW(), "active", ?, ?)';
        server.api.bdd.query(query, [content, title, topicId, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};
