import jwt from "jsonwebtoken";
import dataSource from "../dataSource";
import Env from "../env";
import UserEntity, { TLogin, TUserData } from "../entities/userEntity";
import { decrypt, encrypt } from "../utils/crypt";

class AuthServices {
  static repository = dataSource.getRepository("user");

  static async login(data: TLogin) {
    const { email, password } = data;
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      return {
        code: "ERR_USER_NOT_FOUND",
        status: 404,
        message: "Credenciais inválidas.",
      };
    }
    if (password !== decrypt(user.password)) {
      return {
        code: "ERR_INCORRECT_USER_DATA",
        status: 401,
        message: "Credenciais inválidas.",
      };
    }
    const { password: pass, createdAt, updatedAt, ...attr } = user as TUserData;

    const access_token = jwt.sign({ ...attr }, Env.APP_TOKEN_SECRET, {
      expiresIn: Env.APP_TOKEN_DURATION * 60,
    });
    const refresh_token = jwt.sign({ ...attr }, Env.APP_TOKEN_SECRET, {
      expiresIn: Env.APP_REFRESH_TOKEN_DURATION * 60,
    });
    return {
      user: { ...attr },
      access_token,
      refresh_token,
    };
  }

  static async registerAminUser() {
    if (await this.repository.findOneBy({ name: "admin" })) return;

    const adminUser = new UserEntity();
    adminUser.name = "admin";
    adminUser.email = "admin@mailinator.com";
    adminUser.password = encrypt("admin");

    await this.repository.save(adminUser);
  }
}

export default AuthServices;
