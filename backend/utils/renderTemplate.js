const path = require('path');
const ejs = require('ejs');

module.exports = function renderTemplate(res, view, params = {}) {
  const defaultParams = {
    user: res.locals.user,
    messages: res.locals.messages,
  };
  const viewPath = path.join(__dirname, '../../frontend/views', `${view}.ejs`);
  ejs.renderFile(viewPath, { ...defaultParams, ...params }, {}, (err, str) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.render('layout', { ...defaultParams, body: str });
  });
};
