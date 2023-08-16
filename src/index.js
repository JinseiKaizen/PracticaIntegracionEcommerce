const express = require("express");
const cors = require("cors");
let {Server: HttpServer} = require("http");
const { config } = require("./config");
const serverRoutes = require("./routes");
const path = require("path");
const cookie = require("cookie-parser");
const session = require("express-session");
const Socket = require("./utils/sockets/socket.io");
const passport = require("passport");
const GithubStrategy = require('passport-github').Strategy;
require('./config/mongoDB');
class Server {
  constructor(port) {
    this.httpServer;
    this.socket;
    this.app = express();
    this.PORT = port;
    this.middlewares();
    this.settings();
    this.views();
    this.sockets();
    this.route();
  }

  settings(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.static(`${__dirname}/public`));
  }

  views(){
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  }

  middlewares(){
    this.app.use(cors("*"));
    this.app.use(cookie(`${config.cookie_key}`));
    this.app.use(session({
      secret: config.session_secret,
      resave: true,
      saveUninitialized: true
    }));

    // Passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());

  
  }

  sockets(){
    this.httpServer = new HttpServer(this.app);
    this.socket = new Socket(this.httpServer);
  }

  route(){
    this.app.use((req, res, next)=>{
      // req = {
      //   ...req,
      //   socketManager: this.socket
      // }
      req.socketManager = this.socket;
      next();
    })
    serverRoutes(this.app, this.socket);
  }

  listen(){
    this.httpServer.listen(this.PORT, ()=>{console.log(`http://localhost:${this.PORT}`)});
  }
}

module.exports = new Server(config.port);