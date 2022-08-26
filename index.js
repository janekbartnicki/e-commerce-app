const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(`
        <form method="POST">
            <input type="text" name="email" id="" placeholder="E-mail">
            <input type="text" name="password" id="" placeholder="Password">
            <input type="text" name="passwordConfirmation" id="" placeholder="Confirm password">
            <button>Sign Up</button>
        </form>
    `);
})

app.post('/', async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;

    const existingUser = await usersRepo.getOneBy({email})

    if(existingUser) {
        return res.send('Email in use!');
    }

    if(password !== passwordConfirmation) {
        return res.send('Passwords must match!');
    }

    await usersRepo.create({email, password, passwordConfirmation});
    res.send(`Account for ${email} e-mail created.`);

    
})

app.listen(3000);