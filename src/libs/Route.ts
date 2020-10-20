import { Action } from './Router';
import Router from './Router';
import { Request, Response } from 'express';
import { Controller } from 'index';

export default class Route {
    public middlewares: Array<CallableFunction> = [];

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

    public middleware(...middlewares: CallableFunction[]) {
        middlewares.reverse().forEach((middleware: CallableFunction) => {
            this.middlewares.push(middleware);
            let layer = this.record.route.stack[0];

            let newLayer = new layer.constructor('/', {}, middleware);
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