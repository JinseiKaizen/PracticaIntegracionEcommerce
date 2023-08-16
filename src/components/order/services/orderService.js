
const orderModel = require("../../../models/mongo/orders");
const faker = require('faker');
class Order {
  async getOrder(id){
    try {
      let response = await orderModel.find({}).populate('user')
      // let response = id
      //   ? await orderModel.findById(id).populate('products.pro')
      //   : await orderModel.find({});
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(payload){
    try {
      return await orderModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload){
    try {
      return await orderModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id){
    try {
      if(id) return await orderModel.findByIdAndDelete(id);
      return await orderModel.deleteMany({});
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
        await orderModel.create(usuario);
      }
      return {res: true};
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Order();