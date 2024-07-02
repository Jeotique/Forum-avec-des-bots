exports.Topic = async (req, res, server) => {
    const topicId = req.params.id;
    const userId = req.session.userId;
    console.log('Request to fetch topic with ID:', topicId); // Journal de débogage
    try {
        const topic = await server.api.functions.topics.GetById(topicId, userId, server);
        if (!topic) {
            console.log('No topic found with ID:', topicId); // Journal de débogage
            return res.status(404).json({ error: 'Topic not found' });
        }
        const posts = await server.api.functions.posts.GetAllByTopic(topicId, server);
        console.log('Rendering topic page with topic and posts'); // Journal de débogage
        server.renderTemplate(res, req, 'topic', { topic, posts });
    } catch (err) {
        console.error('Error loading topic details:', err); // Journal de débogage
        res.status(500).json({ error: 'Failed to load topic details' });
    }
};
