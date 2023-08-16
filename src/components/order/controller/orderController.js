
const orderService = require("../services/orderService");
class User {
  async getUser(req, res, next){
    let { id = null } = req.params;
    let response = await orderService.getOrder(id);
    res.json(response);
  }

  async bulk(req, res, next){
    let { cant } = req.params;
    let response = await orderService.bulkCreate(Number(cant));
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    let response = await orderService.create(payload);
    res.json(response);
  }

  async update(req, res, next){
    let { id } = req.params;
    let payload = req.body;
    let response = await orderService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next){
    let { id } = req.params;
    let response = await orderService.delete(id);
    res.json(response);
  }
}

module.exports = new User();