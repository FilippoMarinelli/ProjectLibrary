exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash('erros');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.loginRequired = (req, res, next) =>{
  if(!req.session.user){
    req.flash('erros', 'Você precisa fazer login');
    req.session.save(()=> res.redirect('http://localhost:3000/'))
      return; 
  }
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
