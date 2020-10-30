import express, { Express } from "express";

export class HttpApp {
    protected port: Number = 3000;
    protected host: string = "0.0.0.0";


    public handler(): Express {
        const app: Express = express();

        app.listen(this.port);

        return app;
    }
}