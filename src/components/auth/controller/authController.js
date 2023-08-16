
const authService = require("../services/authService");
class Auth {

  async session(req, res, next){
    let { name = '' } = req.query;
    // console.log(req.session.Session.visits);
    if(req.session.visits){
      req.session.visits++;
      let _name = `${req.session.name.length ? `${req.session.name}, ` : ''}`;
      res.send(`${_name}Haz visitado la pagina ${req.session.visits} veces!`);
    }else{
      req.session.name = name;
      req.session.visits = 1;
      let _name = `${req.session.name.length ? `${req.session.name}, ` : ''}`;
      res.send(`${_name}Te damos la Bienvenida`);
    }
  }

  async loginView(req, res, next){
    console.log(req.session);
    res.render('login', {});
  }
  
  async recoveryView(req, res, next){
    res.render('recovery', {});
  }

  async dashboardView(req, res, next){
    console.log(".........");
    console.log(req.user);
    res.render('dashboard', {});
  }
  
  async registerView(req, res, next){
    res.render('register', {});
  }

  async login(req, res, next){
    let { email, password } = req.body;
    const response = await authService.login({email, password});
    if( response.status === 200){
      req.session.user = response.response;
    }

    console.log(response, req.session.user);
    res.json(response)
    // res.redirect('/auth/login');
    
  }

  async register(req, res, next){
    const response = await authService.register(req.body);
    res.json(response);
  }

  async recovery(req, res, next){
    let { email, password } = req.body;
    const response = await authService.recovery({email, password});
    res.json(response);
  }

  async getCookies(req, res, next){
    // let { name } = req.params;
    res.json(req.cookies);
  }

  async loginViewClase22(req, res, next){
    res.render('testClase22', {});
  }

  async loginclase22(req, res, next){
    let { email, password } = req.body;
    const response = await authService.login({email, password});
    if( response.status === 200){
      req.session.user = response.response;
    }

    console.log(response, req.session.user);
    res.cookie('coderTokenClase22', response.response.token, { maxAge: 60 * 60 * 1000, httpOnly: true }).json(response);
    // res.redirect('/auth/login');
    
  }
}

module.exports = new Auth();