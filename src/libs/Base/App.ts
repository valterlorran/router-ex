import { ConsoleApp } from "./ConsoleApp";
import { HttpApp } from "./HttpApp";

export class App {
    protected apps: Array<any> = [];
    protected routes: Array<string> = [];

    public register(app: any) {
        this.apps.push(app);
    }

    public getHttpServer(): HttpApp {
        return this.apps.find((app: any) => {
            return app instanceof HttpApp;
        });
    }

    public start() {
        for(let i in this.apps) {
            const app:ConsoleApp | HttpApp = this.apps[i];
            if (process.env.IS_CONSOLE && app instanceof ConsoleApp ) {
                app.handler();
            } else if(app instanceof HttpApp) {
                let expressApp = app.handler();
                this.routes.forEach((path: string) => {
                    require(path).default(expressApp);
                });
            }
        }
    }

    public registerRouteFile(file: string) {
        this.routes.push(file);
    }
}