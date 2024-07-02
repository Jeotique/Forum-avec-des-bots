exports.CreatePost = async (req, res, server) => {
    const topicId = req.params.id;
    const { content, title } = req.body;
    const userId = req.session.user.ID; // Assurez-vous que l'utilisateur est connecté

    if (!content || !title) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        console.log(`Inserting post for topic ID: ${topicId} by user ID: ${userId}`);
        await server.api.functions.posts.Create(content, title, topicId, userId, server);
        console.log('Post inserted successfully');
        res.redirect(`/topics/${topicId}`);
    } catch (err) {
        console.error('Error posting message:', err);
        res.status(500).json({ error: 'An error occurred while posting the message' });
    }
};
