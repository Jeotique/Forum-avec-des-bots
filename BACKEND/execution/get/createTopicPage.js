exports.CreateTopicPage = (req, res, server) => {
    server.renderTemplate(res, req, 'createTopic');
};
