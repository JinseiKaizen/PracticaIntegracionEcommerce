const { Server: SocketIO } = require("socket.io");

class Socket {
  static instancia = undefined;
  constructor(http){
    if(Socket.instancia){
      return Socket.instancia;
    }
    Socket.instancia = this;
    this.io = new SocketIO(http);
  }

  init(){
    try {
      this.io.on("connection", socket => {
        console.log("Nuevo usuario conectado!");
      })
    } catch (error) {
      console.log(" /utils/sockets/socket.io ~~ Line 12 ~~ Error En el init");
      console.log(error);
    }
  }
}


module.exports = Socket;