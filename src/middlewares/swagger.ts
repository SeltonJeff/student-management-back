import fs from "fs";
import { resolve } from "path";

class SwaggerConfig {
  private readonly config: {};

  private paths = {};

  private definitions = {};

  constructor() {
    this.config = {
      swagger: "2.0",
      basePath: "/",
      info: {
        title: "Student Management",
        version: "1.0.0",
      },
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    };

    this.definitions = {
      ErrorResponse: {
        type: "object",
        properties: {
          code: { type: "string", description: "Error code name" },
          message: { type: "string", description: "Error message" },
          status: { type: "number", description: "Error status code" },
        },
      },
    };
  }

  public async load(): Promise<{}> {
    const dir = await fs.readdirSync(resolve(__dirname, "..", "docs"));
    return dir.reduce(
      (total, path) => {
        try {
          const swagger = require(resolve(__dirname, "..", `docs/${path}`));
          const aux = total;
          aux.paths = { ...total.paths, ...swagger.default.paths };
          if (swagger.default.definitions) {
            aux.definitions = {
              ...total.definitions,
              ...swagger.default.definitions,
            };
          }
          return total;
        } catch (e) {
          return total;
        }
      },
      {
        ...this.config,
        paths: { ...this.paths },
        definitions: { ...this.definitions },
      }
    );
  }
}

export default new SwaggerConfig();
