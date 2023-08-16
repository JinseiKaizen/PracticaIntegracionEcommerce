const studentService = require("../services/studentService");
const faker = require("faker");
const studentModel = require('../../../models/mongo/student');
class Student {

  async getStudents(paginator){
    try {
      return await studentModel.paginate({}, {...paginator})
    } catch (error) {
      console.log(`[Error] ~~ ${JSON.stringify(error)}`);
    }
  }

    async bulkCreate(cant = 10){
      try {
        let _arrStudents = [];
        for (let i = 0; i < cant; i++) {
          const student = {
            nombre: faker.name.findName(),
            apellido:faker.name.lastName(),
            email: faker.internet.email(),
            calificacion: faker.datatype.number({min:1, max: 10}),
            grupo: faker.random.arrayElement(['1A', '1B']),
            genero: faker.random.arrayElement(['H', 'M']),
          }
          _arrStudents.push(student);
        }
        let students = await studentModel.insertMany(_arrStudents);
        console.log(`New students ~~ `, students);
        return students;
      } catch (error) {
        console.log(`[Error] ~~ ${JSON.stringify(error)}`);
        return [];
      }
    }
}

module.exports = new Student();