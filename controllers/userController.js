const UserControllers = {
    getLogin: (req, res) => {
        res.render('user/login', {
            isLogged: false
        });
    },

    getSignup: (req, res, next) => {
        res.render('user/signup', {
            isLogged: false
        });
    },

    getProfile: (req, res) => {
        console.log("req.user: ", req.user);
        res.render('user/profile', {
            user: req.user,
            isLogged: req.session.isLogged
        });
    },

    logOut: (req, res) => {
        req.session.isLogged = false;
        req.session.user = null;
        req.logout();
        res.redirect('/');
    }
}

module.exports = UserControllers;