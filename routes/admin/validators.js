const {check} = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid e-mail!')
        .custom(async email => {
            const existingUser = await usersRepo.getOneBy({email})

            if(existingUser) {
                throw new Error('E-mail in use!');
            }
        }),

    requirePassword: check('password')
        .trim()
        .isLength({min: 8, max: 20})
        .withMessage('Must be between 8 and 20 characters!'), 

    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({min: 8, max: 20})
        .withMessage('Must be between 8 and 20 characters!')
        .custom(async (passwordConfirmation, {req}) => {
            if(req.body.password !== passwordConfirmation) {
                throw new Error('Passwords must match!');
            }
        }),

    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid e-mail!')
        .custom(async email => {
            const user = await usersRepo.getOneBy({email});

            if(!user) {
                throw new Error(`E-mail ${email} not found!`);
            }
        }),

    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, {req}) => {
            const user = await usersRepo.getOneBy({email: req.body.email});
            const validPassword = await usersRepo.comparePassword(user.password, password);

            if(!user || !validPassword) {
                throw new Error('Invalid password!');
            }
        }),
    
    requireTitle: check('title')
        .trim()
        .isLength({min: 5, max: 40})
        .withMessage('Must be between 5 and 40 characters!'),

    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({min: 1})
        .withMessage('Must be a number greater than 1!')
}