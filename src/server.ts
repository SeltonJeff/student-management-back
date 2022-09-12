import App from "./app";
import env from "./env";
import dataSource from "./dataSource";
import authServices from "./services/authServices";

class Server {
  public readonly app = App;

  constructor() {
    this.startServer();
  }

  private startServer() {
    dataSource
      .initialize()
      .then(() => {
        authServices.registerAminUser();
        this.app.listen(env.APP_PORT, () =>
          console.log("App running at: ", `http://localhost:${env.APP_PORT}`)
        );
      })
      .catch(() => console.log("Failed connect to DB."));
  }
}

new Server();
