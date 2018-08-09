const UserControllers = {
    getLogin: (req, res) => {
        res.render('user/login', {
            isLogged: req.isAuthenticated()
        });
    },

    getSignup: (req, res, next) => {
        res.render('user/signup', {
            isLogged: req.isAuthenticated()
        });
    },

    getProfile: (req, res) => {
        console.log("req.user: ", req.user);
        res.render('user/profile', {
            user: req.user,
            isLogged: req.isAuthenticated()
        });
    },

    logOut: (req, res) => {
        req.logout();
        res.redirect('/');
    }
}

module.exports = UserControllers;