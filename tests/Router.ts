import { NextFunction, Router, Request, Response } from "../src";
import IndexController from "./IndexController";
import TestController from "./TestController";

export default (app:any) => {
    const router = new Router({
        middlewares: ['auth']
    });

    router.resource('/test', TestController);
    
    router.get('/index', [IndexController, 'index']).middleware(
        (request: Request, response: Response, next: NextFunction)=>{
            return next();
        }
    );
}