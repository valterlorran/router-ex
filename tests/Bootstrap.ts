import { register } from "ts-node";
import { App } from "../src/index";
import ConsoleServer from "./ConsoleServer";
import HttpServer from "./HttpServer";

import fs from "fs";
import path from "path";

export const app = new App();

app.register(
    new HttpServer
);

app.register(
    new ConsoleServer
);

app.registerRouteFile(path.join(__dirname, './Router'));

app.start();