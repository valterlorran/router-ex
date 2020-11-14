import express, { Express } from "express";
import { Dictionary } from "libs/types";
import IMiddleware from "libs/Middleware";
import { MiddlewareService } from "index";
import BaseApp from "./BaseApp";
import { RouterServiceProvider } from "libs/Providers/Routes/RouterServiceProvider";

export class HttpApp extends BaseApp {
    protected port: Number = 3000;
    protected host: string = "0.0.0.0";
    protected routeMiddleware: Dictionary<IMiddleware> = {};
    protected middleware: Array<IMiddleware> = [];
    protected middlewareGroups: Dictionary<Array<IMiddleware>> = {};

    public app: Express = express();

    protected onStart() {
        console.log(`default -> http://localhost:${this.port}`);
    }

    public handler(): Express {
        this.middleware.forEach((middleware: IMiddleware) => {
            this.app.use(middleware.handler);
        });

        Object.keys(this.routeMiddleware).forEach((name: string) => {
            const middleware = this.routeMiddleware[name];
            MiddlewareService.register(name, middleware)
        });

        Object.keys(this.middlewareGroups).forEach((group: string) => {
            const middlewareGroup = this.middlewareGroups[group];
            MiddlewareService.group(group, middlewareGroup);
        });

        this.app.listen(this.port, this.onStart.bind(this));

        return this.app;
    }
}