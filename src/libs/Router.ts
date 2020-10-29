import Route from './Route';
import Controller from './Controller';
import { Router as ExpressRouter } from 'express';

export interface Action {
    0: typeof Controller,
    1: string
}

export interface IRouterOptions {
    middlewares?: Array<Function>;
    baseUrl?: string;
}

export default class Router {

    public app: any;
    public expressRouter: any;
    public options: IRouterOptions;

    public routes: Array<Route> = [];

    constructor(app: any, options: IRouterOptions = {}) {
        this.options = options;
        this.expressRouter = ExpressRouter();
        this.app = app;

        (this.options.middlewares || []).forEach((middleware: Function) => {
            this.expressRouter.use(middleware);
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
        const routes: Array<Route> = []

        // @ts-ignore
        if (controller.prototype.index) {
            routes.push(this.addRoute('get', `${path}`, [controller, 'index']));
        } 
        // @ts-ignore
        if (controller.prototype.store) {
            routes.push(this.addRoute('post', `${path}`, [controller, 'store']));
        } 
        // @ts-ignore
        if (controller.prototype.update) {
            routes.push(this.addRoute('put', `${path}/:id`, [controller, 'update']));
        } 
        // @ts-ignore
        if (controller.prototype.destroy) {
            routes.push(this.addRoute('delete', `${path}/:id`, [controller, 'destroy']));
        } 
        // @ts-ignore
        if (controller.prototype.show) {
            routes.push(this.addRoute('get', `${path}/:id`, [controller, 'show']));
        }

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
}