// Tadeo Almiron
const { Router } = require("express");
const authController = require("./controller/authController");
const { isAuth, isNotAuth, getAuthJwt, verifyRole } = require("./middlewares/auth");
module.exports = app =>{
  const router = new Router();
  app.use("/auth", router);
  router.get("/session", authController.session);
  router.get("/login", isNotAuth, authController.loginView);
  router.get("/login/gh", authController.loginView);
  router.get("/login/github", authController.loginView);
  router.get("/register", authController.registerView);
  router.get("/recovery", authController.recoveryView);
  router.get("/dashboard", getAuthJwt, verifyRole('customer', 'admin'), authController.dashboardView);
  router.post("/login",  authController.login);
  router.post("/register", authController.register);
  router.post("/recovery", authController.recovery);
  router.get("/cookies", authController.getCookies);

  router.get("/loginclase22", authController.loginViewClase22);
  router.post("/loginclase22",  authController.loginclase22);
}