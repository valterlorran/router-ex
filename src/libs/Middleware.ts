import { NextFunction, Request, Response } from "express";

export default interface IMiddleware {
    handler(request: Request, response: Response, next: NextFunction): any;
}