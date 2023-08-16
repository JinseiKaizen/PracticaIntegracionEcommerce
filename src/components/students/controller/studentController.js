const studentService = require("../services/studentService");

class Student {


    async home(req,res,next){
      const { page = 1, limit = 2 } = req.query;
      try {
        let students = await studentService.getStudents({page: Number(page), limit: Number(limit)});
        res.render('students', {students})
      } catch (error) {
        res.status(500).send("Error con el paginador");
      }
    }

    async aggregation(req,res,next){
        let result = await studentService.aggregation();
        res.json(result);
    }


    async bulkCreate(req,res,next){
        let { cant = 10 } = req.params;
        let result = await studentService.bulkCreate(Number(cant));
        res.json(result);
    }
}

module.exports = new Student();