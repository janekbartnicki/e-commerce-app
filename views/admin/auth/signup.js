const layout = require('../layout');

const getError = (errors, prop) => {
    try {
        return '<br>' + errors.mapped()[prop].msg;
    } catch(err) {
        return '';
    }
}

module.exports = ({req, errors}) => {
    return layout({content: `
        <div>
            Logged as user by id: ${req.session.userId}.
            <form method="POST">
                <input type="text" name="email" id="" placeholder="E-mail">
                ${getError(errors, 'email')}<br>
                <input type="text" name="password" id="" placeholder="Password">
                ${getError(errors, 'password')}<br>
                <input type="text" name="passwordConfirmation" id="" placeholder="Confirm password">
                ${getError(errors, 'passwordConfirmation')}<br>
                <button>Sign Up</button>
            </form>
        </div>
        `, title: 'Sign Up'});
};