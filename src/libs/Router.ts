import Route from './Route';
import Controller from './Controller';

export interface Action {
    0: typeof Controller,
    1: string
}

export default class Router {

    public app: any;

    public routes: Array<Route> = [];

    constructor(app: any) {
        this.app = app;
    }

    public register(app: any) {
        this.app = app;
    }

    private addRoute(method: 'post' | 'get' | 'put' | 'patch' | 'delete', path: string, action: Action): Route {
        const route = new Route(method, path, action, this);
        this.routes.push(route);
        return route;
    }

    public post(path: string, action: Action) {
        return this.addRoute('post', path, action);
    }

    public get(path: string, action: Action) {
        return this.addRoute('get', path, action);
    }
}