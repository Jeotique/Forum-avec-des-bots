exports.CreatePost = async (req, res, server) => {
    const topicId = req.params.id;
    const { content, title } = req.body;
    const userId = req.session.user.ID;

    if (!content || !title) {
        return res.status(400).json({ error: 'Content and title are required' });
    }

    try {
        const created = await server.api.functions.post.Create(content, title, userId, topicId, server);
        if (created) {
            return res.redirect(`/topics/${topicId}`);
        } else {
            return res.status(500).json({ error: 'Failed to post message' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while posting the message' });
    }
};
