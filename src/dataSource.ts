import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "./env";

const dataSource = new DataSource({
  type: env.TYPEORM_CONNECTION as "postgres" | "mysql",
  host: env.TYPEORM_HOST,
  port: env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  logging: env.TYPEORM_LOGGING,
  synchronize: env.TYPEORM_SYNCHRONIZE,
  entities: [`./src/entities/*.ts`],
  migrations: [`./database/migrations/*.ts`],
});

export default dataSource;
