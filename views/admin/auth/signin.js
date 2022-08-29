const layout = require('../layout');

module.exports = () => {
    return layout({content: `
        <div>
            <form method="POST">
                <input type="text" name="email" id="" placeholder="E-mail">
                <input type="text" name="password" id="" placeholder="Password">
                <button>Sign In</button>
            </form>
        </div>
        `, title: 'Sign In'});
};