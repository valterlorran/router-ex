import { App } from "../src/index";
import ConsoleServer from "./ConsoleServer";
import HttpServer from "./HttpServer";

import path from "path";

export const app = new App();

app.register(
    new HttpServer(app)
);

app.register(
    new ConsoleServer(app)
);

app.registerRouteFile(path.join(__dirname, './Router'));

app.start();