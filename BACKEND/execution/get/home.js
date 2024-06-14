exports.Home = (req, res, server) => {
    server.renderTemplate(res, req, 'main');
};