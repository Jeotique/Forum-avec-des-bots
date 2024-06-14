exports.Register = async(req, res, server) => {
    let { username, password, email, receivemails } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if(receivemails)
        receivemails = 1;
    else
        receivemails = 0;

    let UserExist = await server.api.functions.user.IsExisting(username, email, server);
    if(UserExist) {
        return res.status(400).json({ error: "Nom d'utilisateur ou email déjà utilisé" });
    }

    if(password.length < 8) {
        return res.status(400).json({ error: "Le mot de passe doit contenir au minimum 8 caractères" });
    }

    let AllExistingIds = await server.api.functions.user.GetAllIds(server);
    let UserId = GenerateId(999999, 100000, AllExistingIds);
    
    let Created = await server.api.functions.user.Create(UserId, username, username, email, password, receivemails, server);

    if(Created === true) {
        return res.status(200).json({ success: "Compte créé" });
    } else {
        return res.status(500).json({ error: "Erreur lors de la création du compte" });
    }
};

function GenerateId(max, min, exist) {
    try {
        let myNumber = Math.floor(Math.random() * (max - min + 1)) + min
        do {
            myNumber = Math.floor(Math.random() * (max - min + 1)) + min
        } while (exist.includes(myNumber))
        return myNumber
    }catch(err){
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}