import Route from './Route';
import Controller from './Controller';
import { Router as ExpressRouter } from 'express';
import { App } from './Base/App';
import { MiddlewareService } from '../index';

export interface Action {
    0: typeof Controller,
    1: string
}

export interface IRouterOptions {
    middlewares?: Array<Function|string>;
    baseUrl?: string;
}

export default class Router {

    public app: any;
    public expressRouter: any;
    public options: IRouterOptions;

    public routes: Array<Route> = [];

    constructor(options: IRouterOptions = {}) {
        this.options = options;
        this.expressRouter = ExpressRouter();
        this.app = App.app.getHttpServer().app;

        (this.options.middlewares || []).forEach((middleware: Function|string) => {
            if (middleware.constructor === String) {
                console.log(MiddlewareService.get(middleware))
                MiddlewareService.get(middleware).forEach((callback: CallableFunction) => {
                    this.expressRouter.use(callback);
                })
            } else {
                this.expressRouter.use(middleware);
            }
        })

        this.app.use(this.options.baseUrl || '/', this.expressRouter);
    }

    public register(app: any) {
        this.app = app;
    }

    private addRoute(method: 'post' | 'get' | 'put' | 'patch' | 'delete', path: string, action: Action): Route {
        const route = new Route(method, path, action, this);
        this.routes.push(route);
        return route;
    }

    /**
     * Register a resource
     * @param path URI for the resource
     * @param controller Controller used for the resource
     */
    public resource(path: string, controller: typeof Controller) {
        const routes: Array<Route> = [];
        const pathClear = path.replace(/^\/?|\/?$/, "").replace(/\//g, ".");

        [
            [`${path}`, 'get', 'index'],
            [`${path}`, 'post', 'store'],
            [`${path}/:id`, 'put', 'update'],
            [`${path}/:id`, 'delete', 'destroy'],
            [`${path}/:id`, 'get', 'show'],
        ].forEach((def:any) => {
            const [uri, method, action] = def;
            if ((controller.prototype as any)[action]) {
                let route = this.addRoute(method, uri, [controller, action]).as(`${pathClear}.${action}`);
                routes.push(route);
            }
        })

        return routes;
    }

    /**
     * Register a post route
     * @param path uri for the route
     * @param action action that will be called
     */
    public post(path: string, action: Action) {
        return this.addRoute('post', path, action);
    }

    /**
     * Register a get route
     * @param path uri for the route
     * @param action action that will be called
     */
    public get(path: string, action: Action) {
        return this.addRoute('get', path, action);
    }

    /**
     * Register a put route
     * @param path uri for the route
     * @param action action that will be called
     */
    public put(path: string, action: Action) {
        return this.addRoute('put', path, action);
    }

    /**
     * Register a patch route
     * @param path uri for the route
     * @param action action that will be called
     */
    public patch(path: string, action: Action) {
        return this.addRoute('patch', path, action);
    }

    /**
     * Register a delete route
     * @param path uri for the route
     * @param action action that will be called
     */
    public delete(path: string, action: Action) {
        return this.addRoute('delete', path, action);
    }

    public static group(fn: Function, middlewareGroup: string): Router {
        const router = new Router({
            middlewares: MiddlewareService.get(middlewareGroup)
        });
        fn(router);
        return router;
    }
}