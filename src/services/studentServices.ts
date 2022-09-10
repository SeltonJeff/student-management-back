import dataSource from "../dataSource";
import StudentEntity, { TStudentData } from "../entities/studentEntity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class StudentServices {
  static repository = dataSource.getRepository("Student");

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
          code: "409.001",
          status: 409,
          message: "Already have a user with this document.",
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
        code: error.code || "500",
        message: error.message || "Internal server error.",
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
          code: "404.001",
          status: 404,
          message: "Student not found.",
        };

      await this.repository.update({ ra }, data);
      return { ra: checkExists.ra };
    } catch (error: any) {
      return {
        code: error.code || "500",
        message: error.message || "Internal server error.",
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
          code: "404.001",
          status: 404,
          message: "Student not found.",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default StudentServices;
