import { Request, Response } from 'express'
import { Dictionary } from './types';


export default class Controller {
    public request: Request;
    public response: Response;
    public app: Dictionary<any> = {}

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public respond(status: number, data: any) {
        let res = this.response.status(status);
        if (typeof data === 'object') {
            return res.json(data);
        }
        return res.send(data);
    }

    public respondSuccess(data?: any) {
        return this.respond(200, data);
    }

    public respondError(errorCode: number, message?: String) {
        return this.respond(errorCode, message);
    }

    public respondFile(file: string) {
        return this.response.sendFile(file);
    }
}