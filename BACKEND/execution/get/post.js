exports.Post = async (req, res, server) => {
    const postId = req.params.id;
    try {
        console.log(`Fetching post with ID: ${postId}`);
        const post = await server.api.functions.posts.GetById(postId, server);
        if (!post) {
            throw new Error('Post not found');
        }

        console.log(`Post fetched successfully: ${JSON.stringify(post)}`);

        const responses = await server.api.functions.responses.GetByPostId(postId, server);
        console.log(`Responses fetched successfully: ${JSON.stringify(responses)}`);

        server.renderTemplate(res, req, 'post', { post, responses });
    } catch (err) {
        console.error('Error loading post details:', err);
        res.status(500).json({ error: 'Failed to load post details' });
    }
};
