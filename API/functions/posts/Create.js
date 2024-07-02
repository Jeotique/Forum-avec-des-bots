exports.Create = (content, title, postId, userId, server) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing query to insert post with title: ${title} for topic ID: ${postId}`);
        const query = 'INSERT INTO post (Contenu, Titre, Date_de_création, Etat, ID_Topic, ID_Utilisateur) VALUES (?, ?, NOW(), ?, ?, ?)';
        server.api.bdd.query(query, [content, title, 'active', postId, userId], (err, result) => {
            if (err) {
                console.error('Error during query execution:', err);
                reject(err);
            } else {
                console.log('Post inserted successfully');
                resolve(result.insertId);
            }
        });
    });
};
