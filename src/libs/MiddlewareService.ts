import IMiddleware from './Middleware';

export default class MiddlewareService {
    private static middlewares: Record<string, IMiddleware> = {};

    public static register(name: string, middleware: IMiddleware) {
        this.middlewares[name] = middleware;
        return this;
    }

    public static get(name: string): CallableFunction {
        if (!this.middlewares[name]) {
            throw Error(`The middleware with key "${name}" is not registered`);
        }

        return this.middlewares[name].handler;
    }
}