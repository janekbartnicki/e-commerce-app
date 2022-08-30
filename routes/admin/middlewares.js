const {validationResult} = require('express-validator');

module.exports = {
    handleErrors(tepmlateFunction) {
        return (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.send(tepmlateFunction({errors}));
            }

            next();
        }
    }, 
    requireAuth(req, res, next) {
        if(!req.session.userId) {
            return res.redirect('/signin'); 
         }
        
        next();
    }
};