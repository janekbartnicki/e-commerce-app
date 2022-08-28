const usersRepo = require('../../repositories/users');

app.get('/signup', (req, res) => {
    res.send(`
        <div>
            Logged as user by id: ${req.session.userId}.
            <form method="POST">
                <input type="text" name="email" id="" placeholder="E-mail">
                <input type="text" name="password" id="" placeholder="Password">
                <input type="text" name="passwordConfirmation" id="" placeholder="Confirm password">
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/signup', async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;

    const existingUser = await usersRepo.getOneBy({email})

    if(existingUser) {
        return res.send('Email in use!');
    }

    if(password !== passwordConfirmation) {
        return res.send('Passwords must match!');
    }

    const user = await usersRepo.create({email, password});

    req.session.userId = user.id;

    res.send(`Account for ${email} e-mail created.`);
});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('Logged Out!');
});

app.get('/signin', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input type="text" name="email" id="" placeholder="E-mail">
                <input type="text" name="password" id="" placeholder="Password">
                <button>Sign In</button>
            </form>
        </div>
    `)
});

app.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    
    const user = await usersRepo.getOneBy({email});

    if(!user) {
        return res.send(`E-mail ${email} not found!`);
    }
    
    const validPassword = await usersRepo.comparePassword(user.password, password);
    if(!validPassword) {
        return res.send('Wrong password!');
    }

    req.session.userId = user.id;

    res.send(`Logged as ${req.session.userId}`);
});