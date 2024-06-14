exports.Login = (req, res, server) => {
    server.renderTemplate(res, req, 'login');
};