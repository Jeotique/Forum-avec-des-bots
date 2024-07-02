exports.Topic = async (req, res, server) => {
    const topicId = req.params.id;
    const userId = req.session.userId;
    try {
        console.log(`Fetching topic with ID: ${topicId}`);
        const topic = await server.api.functions.topics.GetById(topicId, userId, server);
        if (!topic) {
            throw new Error('Topic not found');
        }

        console.log(`Topic fetched successfully: ${JSON.stringify(topic)}`);
        
        const posts = await server.api.functions.posts.GetByTopicId(topicId, server);
        console.log(`Posts fetched successfully: ${JSON.stringify(posts)}`);
        
        server.renderTemplate(res, req, 'topic', { topic, posts });
    } catch (err) {
        console.error('Error loading topic details:', err);
        res.status(500).json({ error: 'Failed to load topic details' });
    }
};
