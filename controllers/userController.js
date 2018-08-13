const UserControllers = {
    getLogin: (req, res) => {
        const data = {
            isLogged: false
        }
        res.render('user/login', {
            data: data
        });
    },

    getSignup: (req, res, next) => {
        const data = {
            isLogged: false
        }
        res.render('user/signup', {
            data: data
        });
    },

    getProfile: (req, res) => {
        console.log("req.user: ", req.user);
        const data = {
            user: req.user,
            isLogged: req.session.isLogged
        }
        res.render('user/profile', {
            data: data
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