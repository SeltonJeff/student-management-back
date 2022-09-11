import { Router } from "express";
import { setup, serve } from "swagger-ui-express";

import SwaggerDocument from "./middlewares/swagger";

class SwaggerRoutes {
  async load(): Promise<Router> {
    const swaggerRoute = Router();
    const document = await SwaggerDocument.load();
    swaggerRoute.use("/api-docs", serve);
    swaggerRoute.get("/api-docs", setup(document));

    return swaggerRoute;
  }
}

export default new SwaggerRoutes();
