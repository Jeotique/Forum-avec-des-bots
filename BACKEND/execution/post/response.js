exports.Response = async (req, res, server) => {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.session.user.ID; // Assurez-vous que l'utilisateur est connecté

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        console.log(`Inserting response for post ID: ${postId} by user ID: ${userId}`);
        await server.api.functions.responses.Create(content, postId, userId, server);
        console.log('Response inserted successfully');
        res.redirect(`/posts/${postId}`);
    } catch (err) {
        console.error('Error posting response:', err);
        res.status(500).json({ error: 'An error occurred while posting the response' });
    }
};
