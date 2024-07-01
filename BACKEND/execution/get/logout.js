exports.Logout = (req, res, server) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ error: 'An error occurred during logout' });
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};
