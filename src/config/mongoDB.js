const mongoose = require("mongoose");
const { mongo } = require("./");
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
let connection;
(async ()=>{
  try {
    connection = await mongoose.connect(mongo.mongo_atlas);
    console.log("Conexión exitosa!");
  } catch (error) {
    console.log(error)
    console.log("No se pudo conectar a la base de datos!");
  }
})();

module.exports = { connection };

