import App from "./app";

class Server {
  public readonly app = App;

  constructor() {
    this.startServer();
  }

  private startServer() {
    const port = 3000;
    this.app.listen(port, () =>
      console.log("App running at: ", `http://localhost:${port}`)
    );
  }
}

new Server();
