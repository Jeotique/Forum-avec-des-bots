exports.Home = async (req, res, server) => {
    try {
        const topics = await server.api.functions.topics.GetAll(server);
        server.renderTemplate(res, req, 'main', { topics });
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: 'Failed to load topics' });
    }
};
