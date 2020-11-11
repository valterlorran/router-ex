import { ConsoleApp } from "./ConsoleApp";
import { HttpApp } from "./HttpApp";

export class App {
    protected apps: Array<any> = [];

    public register(app: any) {
        this.apps.push(app);
    }

    public start() {

        for(let i in this.apps) {
            const app:ConsoleApp | HttpApp = this.apps[i];
            if (process.env.IS_CONSOLE && app instanceof ConsoleApp ) {
                app.handler();
            } else if(app instanceof HttpApp) {
                app.handler();
            }
        }
    }
}