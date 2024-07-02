exports.Post = async (req, res, server) => {
    const postId = req.params.id;
    console.log('Request to fetch post with ID:', postId); // Journal de débogage
    try {
        const post = await server.api.functions.posts.GetById(postId, server);
        if (!post) {
            console.log('No post found with ID:', postId); // Journal de débogage
            return res.status(404).json({ error: 'Post not found' });
        }
        const responses = await server.api.functions.reponses.GetAllByPost(postId, server);
        console.log('Rendering post page with post and responses'); // Journal de débogage
        server.renderTemplate(res, req, 'post', { post, responses });
    } catch (err) {
        console.error('Error loading post details:', err); // Journal de débogage
        res.status(500).json({ error: 'Failed to load post details' });
    }
};
