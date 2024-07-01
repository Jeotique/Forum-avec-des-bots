exports.CreateTopic = async (req, res, server) => {
    const { title, description, tags } = req.body;
    const userId = req.session.user.ID;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const created = await server.api.functions.topic.Create(title, description, tags, userId, server);
        if (created) {
            return res.redirect('/');
        } else {
            return res.status(500).json({ error: 'Failed to create topic' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the topic' });
    }
};
