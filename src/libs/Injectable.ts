import Route from "./Route";
import { Request, Response } from 'express'


export default interface Injectable {
    name: string;
    canInject(request: Request, response: Response, route: Route): Boolean;
    handle(request: Request, response: Response, route: Route): any;
}