
const userService = require("../services/userService");
class User {
  async getUser(req, res, next){
    let { id = null } = req.params;
    let response = await userService.getUser(id);
    res.json(response);
  }

  async bulk(req, res, next){
    let { cant } = req.params;
    let response = await userService.bulkCreate(Number(cant));
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    let response = await userService.create(payload);
    res.json(response);
  }

  async update(req, res, next){
    let { id } = req.params;
    let payload = req.body;
    let response = await userService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next){
    let { id } = req.params;
    let response = await userService.delete(id);
    res.json(response);
  }
}

module.exports = new User();