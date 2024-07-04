module.exports = function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      return next();
    }
    req.flash('error', 'You need to be logged in to perform this action.');
    res.redirect('/auth/login');
  };
  