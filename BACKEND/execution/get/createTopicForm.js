exports.CreateTopicForm = (req, res, server) => {
    server.renderTemplate(res, req, 'createTopic');
};
