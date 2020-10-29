import { Request, Response } from 'express'
import Injectable from './Injectable';
import Route from './Route';
import { Dictionary } from './types';

class Injection {
    protected injectables: Array<Injectable> = [];

    public register(injectable: Injectable) {
        this.injectables.push(injectable);
    }

    $inject(request: Request, response: Response, route: Route) {
        let inejctions:Dictionary<any>  = {};

        this.injectables.forEach((injectable: Injectable) => {
            if (injectable.canInject(request, response, route)) {
                inejctions[injectable.name] = injectable.handle(request, response, route);
            }
        })

        return inejctions;
    }
}

export default new Injection();