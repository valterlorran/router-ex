import express, { Express } from "express";

export class HttpApp {
    protected port: Number = 3000;
    protected host: string = "0.0.0.0";

    public app: Express|undefined;

    protected onStart() {
        console.log(`default -> http://localhost:${this.port}`);
    }

    public handler(): Express {
        this.app = express();

        this.app.listen(this.port, this.onStart.bind(this));

        return this.app;
    }
}