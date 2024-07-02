exports.CreateTopic = async (req, res, server) => {
    const { title, description, tags } = req.body;
    const userId = req.session.user.ID; // Assurez-vous que l'utilisateur est connecté

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        console.log(`Inserting topic with title: ${title} by user ID: ${userId}`);
        await server.api.functions.topics.Create(title, description, userId, tags, server);
        console.log('Topic inserted successfully');
        res.redirect('/');
    } catch (err) {
        console.error('Error creating topic:', err);
        res.status(500).json({ error: 'An error occurred while creating the topic' });
    }
};
