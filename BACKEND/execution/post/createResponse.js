exports.CreateResponse = async (req, res, server) => {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.session.user.ID;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const created = await server.api.functions.reponse.Create(content, userId, postId, server);
        if (created) {
            return res.redirect(`/posts/${postId}`);
        } else {
            return res.status(500).json({ error: 'Failed to post response' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while posting the response' });
    }
};
