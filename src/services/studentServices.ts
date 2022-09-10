import dataSource from "../dataSource";
import StudentEntity, { TStudentData } from "../entities/studentEntity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class StudentServices {
  static repository = dataSource.getRepository("student");

  static async listStudent() {
    try {
      return await this.repository.find();
    } catch (error) {
      console.log(error);
    }
  }

  static async listStudentsByQuery(query: string) {
    try {
      return (await this.repository.find()).filter(
        (student) =>
          student.name.includes(query) || student.email.includes(query)
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async newStudent(data: TStudentData) {
    try {
      const check = await this.repository.findOneBy({ cpf: data.cpf });
      if (check && check.cpf === data.cpf)
        return {
          code: "ERR_DOCUMENT_ALREADY_IN_USE",
          status: 409,
          message: "Este cpf já possui cadastro.",
        };

      const curStudent = new StudentEntity();
      curStudent.ra = data.ra;
      curStudent.name = data.name;
      curStudent.email = data.email;
      curStudent.cpf = data.cpf;
      await this.repository.save(curStudent);
      return { ra: curStudent.ra };
    } catch (error: any) {
      return {
        code: error.code || "ERR_INTERNAL_ERROR",
        message: error.message || "Erro no servidor.",
        status: error.status || 500,
      };
    }
  }

  static async editStudent(
    ra: string,
    data: QueryDeepPartialEntity<StudentEntity>
  ) {
    try {
      const checkExists = await this.repository.findOneBy({ ra });
      if (!checkExists)
        return {
          code: "ERR_STUDENT_NOT_FOUND",
          status: 404,
          message: "Estudante não encontrado.",
        };

      await this.repository.update({ ra }, data);
      return { ra: checkExists.ra };
    } catch (error: any) {
      return {
        code: error.code || "ERR_INTERNAL_ERROR",
        message: error.message || "Erro no servidor.",
        status: error.status || 500,
      };
    }
  }

  static async deleteStudent(ra: string) {
    try {
      if (await this.repository.findOneBy({ ra })) {
        await this.repository.delete({ ra });
        return {
          message: "Student has ben deleted.",
        };
      } else {
        return {
          code: "ERR_STUDENT_NOT_FOUND",
          status: 404,
          message: "Estudante não encontrado.",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default StudentServices;
