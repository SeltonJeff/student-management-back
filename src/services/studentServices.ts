import dataSource from "../dataSource";
import StudentEntity, { TStudentData } from "../entities/studentEntity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class StudentServices {
  static repository = dataSource.getRepository("student");

  static async listStudent() {
    try {
      return await this.repository.find();
    } catch (error) {
      return {
        code: "ERR_STUDENT_LISTING",
        status: 500,
        message: "Erro ao listar estudantes.",
      };
    }
  }

  static async listStudentsByQuery(query: string) {
    try {
      return (await this.repository.find()).filter(
        (student) =>
          student.name.includes(query.toUpperCase()) ||
          student.email.includes(query) ||
          student.cpf.includes(query)
      );
    } catch (error) {
      return {
        code: "ERR_STUDENT_LISTING",
        status: 500,
        message: "Erro ao listar estudantes.",
      };
    }
  }

  static async newStudent(data: TStudentData) {
    try {
      const checkCpf = await this.repository.findOneBy({ cpf: data.cpf });
      const checkRa = await this.repository.findOneBy({ ra: data.ra });
      if (checkCpf && checkCpf.cpf === data.cpf)
        return {
          code: "ERR_DOCUMENT_ALREADY_IN_USE",
          status: 409,
          message: "Este cpf já possui cadastro.",
        };
      if (checkRa && checkRa.ra === data.ra) {
        return {
          code: "ERR_RA_ALREADY_IN_USE",
          status: 409,
          message: "Este RA já possui cadastro.",
        };
      }

      const curStudent = new StudentEntity();
      curStudent.ra = data.ra;
      curStudent.name = data.name.toUpperCase();
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
    _id: string,
    data: QueryDeepPartialEntity<StudentEntity>
  ) {
    try {
      const checkExists = await this.repository.findOneBy({ _id });
      if (!checkExists)
        return {
          code: "ERR_STUDENT_NOT_FOUND",
          status: 404,
          message: "Estudante não encontrado.",
        };

      await this.repository.update({ _id }, data);
      return { _id: checkExists._id };
    } catch (error: any) {
      return {
        code: error.code || "ERR_INTERNAL_ERROR",
        message: error.message || "Erro no servidor.",
        status: error.status || 500,
      };
    }
  }

  static async deleteStudent(_id: string) {
    try {
      if (await this.repository.findOneBy({ _id })) {
        await this.repository.delete({ _id });
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
