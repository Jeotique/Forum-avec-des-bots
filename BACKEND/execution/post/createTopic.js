exports.CreateTopic = async (req, res, server) => {
    const { title, description } = req.body;
    const userId = req.session.user.ID; // Assurez-vous que l'utilisateur est authentifié et que son ID est accessible

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const created = await server.api.functions.topic.Create(title, description, userId, server);
        if (created) {
            return res.redirect('/');
        } else {
            return res.status(500).json({ error: 'Failed to create topic' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the topic' });
    }
};