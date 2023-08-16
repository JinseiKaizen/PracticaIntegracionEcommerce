// Tadeo Almiron
const { Router } = require("express");
const orderController = require("./controller/orderController");
module.exports = app =>{
  const router = new Router();
  app.use("/order", router);
  router.get("/", orderController.getUser);
  router.get("/bulkcreate/:cant", orderController.bulk);
  router.get("/:id", orderController.getUser);
  router.post("/", orderController.create);
  router.put("/:id", orderController.update);
  router.delete("/:id", orderController.delete);
  router.delete("/", orderController.delete);
}