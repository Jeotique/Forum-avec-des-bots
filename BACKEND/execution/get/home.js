exports.Home = async (req, res, server) => {
    try {
        console.log('Fetching topics...');
        const topics = await server.api.functions.topics.GetAll(server);
        console.log('Fetched topics:', topics); // Ajout du journal pour vérifier les topics récupérés
        server.renderTemplate(res, req, 'main', { topics });
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: 'Failed to load topics' });
    }
};
