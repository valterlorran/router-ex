import ServiceProvider from "libs/Providers/ServiceProvider";
import { ConsoleApp } from "./ConsoleApp";
import { HttpApp } from "./HttpApp";
import { WsApp } from "./WsApp";

export class App {
    protected apps: Array<any> = [];
    protected routes: Array<string> = [];
    protected providers: Array<ServiceProvider> = [];

    public static app: App;
    public static isClusterEnabled: Boolean = true;

    constructor(){
        App.app = this;
    }

    public register(app: any) {
        this.apps.push(app);
    }

    public getHttpServer(): HttpApp {
        return this.apps.find((app: any) => {
            return app instanceof HttpApp;
        });
    }

    public getWsServer(): HttpApp {
        return this.apps.find((app: any) => {
            return app instanceof WsApp;
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
            } else if(app instanceof WsApp) {
                let expressApp = app.handler();
            }
        }
    }

    public registerRouteFile(file: string) {
        this.routes.push(file);
    }

    public registerProviders(providers: Array<typeof ServiceProvider>) {
        providers.forEach((provider: typeof ServiceProvider) => {
            let providerInstance = new provider(this);

            providerInstance.boot();

            this.providers.push(providerInstance);
        });
    }
}