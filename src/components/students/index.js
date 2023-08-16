const { Router } = require("express");
const studentController = require("./controller/studentController");

module.exports = app => {
  const router = new Router();
  app.use("/students", router);
  router.get("/", studentController.home);
  router.get("/aggregation", studentController.aggregation);
  router.get("/bulkcreate/:cant", studentController.bulkCreate);
}