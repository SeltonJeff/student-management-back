import { config } from "dotenv";
config();

interface IEnv {
  APP_PORT: number;
  APP_SECRET: string;
  TYPEORM_CONNECTION: string;
  TYPEORM_HOST: string;
  TYPEORM_DATABASE: string;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_PORT: number;
  TYPEORM_MIGRATIONS: string;
  TYPEORM_MIGRATIONS_DIR: string;
  TYPEORM_LOGGING: boolean;
  TYPEORM_SYNCHRONIZE: boolean;
}

class Env implements IEnv {
  public APP_PORT = Number(process.env.APP_PORT);
  public APP_SECRET = String(process.env.APP_SECRET);
  public TYPEORM_CONNECTION = String(process.env.TYPEORM_CONNECTION);
  public TYPEORM_HOST = String(process.env.TYPEORM_HOST);
  public TYPEORM_DATABASE = String(process.env.TYPEORM_DATABASE);
  public TYPEORM_USERNAME = String(process.env.TYPEORM_USERNAME);
  public TYPEORM_PASSWORD = String(process.env.TYPEORM_PASSWORD);
  public TYPEORM_PORT = Number(process.env.TYPEORM_PORT);
  public TYPEORM_MIGRATIONS = String(process.env.TYPEORM_MIGRATIONS);
  public TYPEORM_MIGRATIONS_DIR = String(process.env.TYPEORM_MIGRATIONS_DIR);
  public TYPEORM_LOGGING = process.env.TYPEORM_LOGGING === "true";
  public TYPEORM_SYNCHRONIZE = process.env.TYPEORM_SYNCHRONIZE === "true";
}

export default new Env();
