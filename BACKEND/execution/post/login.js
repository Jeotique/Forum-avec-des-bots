const crypto = require('crypto');

exports.Login = async (req, res, server) => {
    const { emailOrUsername, password } = req.body;
    console.log(`Login attempt with email or username: ${emailOrUsername}`);
    
    if (!emailOrUsername || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const cleanedPassword = password.trim();
    console.log(`Cleaned password for login: ${cleanedPassword}`); // Ajout du journal
    const hashedPassword = crypto.createHash('sha512').update(cleanedPassword).digest('hex');
    console.log(`Hashed password for login: ${hashedPassword}`); // Ajout du journal

    try {
        const user = await authenticateUser(emailOrUsername, hashedPassword, server);
        if (user) {
            req.session.user = user;
            console.log(`User authenticated: ${JSON.stringify(user)}`);
            res.redirect('/');
        } else {
            console.log(`Invalid credentials for user: ${emailOrUsername} with hashed password: ${hashedPassword}`);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};

async function authenticateUser(emailOrUsername, hashedPassword, server) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?';
        console.log(`Executing query: ${query} with params: ${emailOrUsername}, ${hashedPassword}`); // Ajout du journal
        server.api.bdd.query(query, [emailOrUsername, emailOrUsername, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error during query execution:', err); // Ajout du journal
                reject(err);
            } else {
                console.log('Database query result:', result); // Ajout du journal
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
}
