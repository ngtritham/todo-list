const UserControllers = {
    getLogin: (req, res, next) => {
        res.render('user/login');
    },

    getSignup: (req, res, next) => {
        res.render('user/signup');
    }
}

module.exports = UserControllers;