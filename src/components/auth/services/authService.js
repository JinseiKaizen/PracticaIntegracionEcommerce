
const userModel = require("../../../models/mongo/user");
const JWTService = require("../../../utils/JWT/JWTServices");
const { createHash, isValidPassword } = require("../middlewares/bcrypt");
const faker = require("faker");
class Auth {
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

  async login({email, password}){
    try {
      let user = await userModel.findOne({
        email: email
      });
      console.log(user);
      if(!user) return {status:401, response: "No existes en la BD!"}
      if(!isValidPassword(password, user)) return {status:403, response: "Credenciales inválidas"}
      return {status:200, response: user};
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async register(userObj){
    try {
      let newUser = {
        ...userObj,
        password: createHash(userObj.password),
        token: ''
      };
      let user = await userModel.create(newUser);
      let token = await JWTService.generateJWT({id: user._id});
      let updatedUser = await userModel.findByIdAndUpdate(user._id, {token}, { new: true });
      
      return {status:201, updatedUser};
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async recovery({email, password}){
    try {
      let user = await userModel.findOne({
        email: email
      });
      console.log(user);
      if(!user) return {status:401, response: "No existe en la BD!"}
      let updatedPassword = await userModel.findByIdAndUpdate(user._id, {password: createHash(password)}, { new: true });
      console.log({updatedPassword});
      return {status:200, response: updatedPassword};
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async bulkCreate(cant){
    try {
      for (let i = 0; i < cant; i++) {
        const product = {
          "nombre": faker.commerce.productName(),
          "descripcion": faker.lorem.sentence(),
          "precio": faker.commerce.price(),
          "stock": faker.random.number(),
          "imagen": faker.image.imageUrl()
        }
        await productModel.create(product);
      }
      return {res: true};
    } catch (error) {
      console.log(error);
    }
  }

  async createCookie(payload){
    try {
      return await productModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async getCookies(id, payload){
    try {
      return await productModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Auth();