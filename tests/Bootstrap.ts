import { register } from "ts-node";
import { App } from "../src/index";
import ConsoleServer from "./ConsoleServer";
import HttpServer from "./HttpServer";

const $app = new App();

$app.register(
    new HttpServer
);

$app.register(
    new ConsoleServer
);