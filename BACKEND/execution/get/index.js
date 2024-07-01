const { Home } = require('./home.js');
const { Register } = require('./register.js');
const { Login } = require('./login.js');
const { Topic } = require('./topic.js');
const { Post } = require('./post.js');
const { CreateTopicPage } = require('./createTopicPage'); // Ajoutez cette ligne
const { Logout } = require('./logout.js');

module.exports = {
    Home,
    Register,
    Login,
    Topic,
    Post,
    CreateTopicPage,
    Logout 
};
