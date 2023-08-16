// Para darle vida a los componentes
// const chatAPI = require("../components/chat");
const userAPI = require("../components/user");
const productAPI = require("../components/product");
const orderAPI = require("../components/order");
const studentAPI = require("../components/students");
const authAPI = require("../components/auth");
module.exports = app => {
  // chatAPI(app);
  productAPI(app);
  userAPI(app);
  orderAPI(app);
  studentAPI(app);
  authAPI(app);
  app.get("/", (req, res, next)=> {res.send("Server on!")});
}
