const express = require('express');
const app = express();

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

const bodyParser = (req, res, next) => {
    if(req.method === 'POST') {
        req.on('data', data => {
            const dataRecived = {};
            for(let element of data.toString('utf8').split('&')) {
                dataRecived[element.split('=')[0]] = element.split('=')[1];
            }
    
            console.log(dataRecived);
        });
    }
}

app.post('/', (req, res) => {
})

app.listen(3000)