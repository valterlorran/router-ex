import { Action } from './Router';
import Router from './Router';
import { Request, Response } from 'express';
import { Controller } from 'index';
import { stringify } from 'querystring';
import MiddlewareService from './MiddlewareService';

export default class Route {
    public middlewares: Array<Function> = [];

    public method: string;
    public path: string;
    public action: Action;
    public router: Router;
    public record: any;

    constructor(method: 'post' | 'get' | 'put' | 'patch' | 'delete', path: string, action: Action, router: Router) {
        this.method = method;
        this.path = path;
        this.action = action;
        this.router = router;

        this.register();
    }

    public middleware(...middlewares: Array<Function| string>) {
        middlewares.reverse().forEach((middleware: Function | string) => {
            let _callback;
            if (middleware.constructor === String) {
                _callback = MiddlewareService.get(middleware);
                this.middlewares.push(_callback);
            } else if(middleware.constructor === Function) {
                _callback = middleware;
                this.middlewares.push(middleware as Function)
            } else {
                throw Error(`The type "${middleware.constructor.name}" is not a valid parameter`);
            }

            let layer = this.record.route.stack[0];

            let newLayer = new layer.constructor('/', {}, _callback);
            this.record.route.stack.unshift(newLayer);
        });

        return this;
    }

    private register() {
        this.router.expressRouter[this.method](this.path, this.startRoute.bind(this));
        this.record = this.router.expressRouter.stack[this.router.expressRouter.stack.length - 1]
    }

    private async startRoute(request: Request, response: Response) {
        const controller: typeof Controller = this.action[0];
        const method:string = this.action[1];

        const _controller: any = new controller(request, response);
        
        let res = await _controller[method](request, response);

        if (res && res.constructor.name !== 'ServerResponse') {
            response.status(200).send(res);
        }
    }
}