const express = require('express');
const bodyParser = require('body-parser');

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

app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(3000)