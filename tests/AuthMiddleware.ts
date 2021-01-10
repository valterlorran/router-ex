import { IMiddleware, NextFunction, Response, Request } from '../src/index'

export default class AuthMiddleware implements IMiddleware {
    public handler(request: Request, response: Response, next: NextFunction) {
        console.log('middleware auth')
        next();
    }
}