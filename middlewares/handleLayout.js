module.exports = (req, res, next) => {
  console.log();
  if (req.session.isLogged === undefined || req.session.isLogged === false) {
    if(req.session.isLogged === undefined){
      req.session.isLogged = false;
    }
    res.redirect('/');
  }

  if(req.session.isLogged === true){
    next();
  }
};