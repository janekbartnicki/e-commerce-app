module.exports = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sign In</title>
        </head>
        <body>
            <div>
                <form method="POST">
                    <input type="text" name="email" id="" placeholder="E-mail">
                    <input type="text" name="password" id="" placeholder="Password">
                    <button>Sign In</button>
                </form>
            </div>
        </body>
    </html>
`;
};