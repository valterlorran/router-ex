import IMiddleware from './Middleware';

export default class MiddlewareService {
    private static middlewares: Record<string, IMiddleware> = {};
    private static middlewaresGroups: Record<string, Array<IMiddleware>> = {};

    public static register(name: string, middleware: IMiddleware) {
        this.middlewares[name] = middleware;
        return this;
    }

    public static group(name: string, middlewares: Array<IMiddleware>) {
        this.middlewaresGroups[name] = middlewares;
        return this;
    }

    public static get(name: string): Array<CallableFunction> {
        if (this.middlewaresGroups[name]) {
            return this.middlewaresGroups[name].map((middleware: IMiddleware) => middleware.handler);
        }
        if (this.middlewares[name]) {
            return [this.middlewares[name].handler]
        }
        
        throw Error(`The middleware with key "${name}" is not registered`);
    }
}