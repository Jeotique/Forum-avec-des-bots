

exports.Login = async (req, res, server) => {
    const { identifier, password } = req.body;

    console.log('Login attempt with identifier:', identifier); // Journal de débogage

    if (!identifier || !password) {
        console.log('Identifier or password missing'); // Journal de débogage
        return res.status(400).json({ error: 'Identifier and password are required' });
    }

    try {
        const user = await server.api.functions.user.Authenticate(identifier, password, server);
        if (user) {
            console.log('User authenticated:', user); // Journal de débogage
            req.session.user = user; // Assurez-vous que les sessions sont correctement configurées
            return res.redirect("/");
            //return res.status(200).json({ success: 'Logged in successfully', user });
        } else {
            console.log('Invalid identifier or password'); // Journal de débogage
            return res.status(401).json({ error: 'Invalid identifier or password' });
        }
    } catch (err) {
        console.error('Error during login:', err); // Journal de débogage
        return res.status(500).json({ error: 'An error occurred during login' });
    }
};
