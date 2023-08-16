
const userModel = require("../../../models/mongo/user");
const faker = require('faker');
class User {
  async getUser(id){
    try {
      let response = id
        ? await userModel.findById(id)
        : await userModel.find({});
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(payload){
    try {
      return await userModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload){
    try {
      return await userModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id){
    try {
      if(id) return await userModel.findByIdAndDelete(id);
      return await userModel.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async bulkCreate(cant){
    try {
      for (let i = 0; i < cant; i++) {
        const usuario = {
          nombre: faker.name.firstName(),
          apellido: faker.name.lastName(),
          email: faker.internet.email(),
          edad: faker.date.past(),
          photo: faker.image.avatar()
        };
        await userModel.create(usuario);
      }
      return {res: true};
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new User();