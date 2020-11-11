
import { Router } from "../src/index";

import { NextFunction, Request, Response } from "../src/index";
import IndexController from './IndexController';
import TestController from "./TestController";
import axios from "axios";
import Injectable from "../src/libs/Injectable";
import Route from "../src/libs/Route";
import Injection from "../src/libs/Injection";

const port = 3000;

const router = new Router(app);

router.resource('/test', TestController);

router.get('/index', [IndexController, 'index']).middleware(
    (request: Request, response: Response, next: NextFunction)=>{
        return next();
    }
);


class IndexInjectable implements Injectable {
    name: string = "indexInj";
    
    canInject(request: Request, response: Response, route: Route): Boolean {
        return true;
    }

    handle(request: Request, response: Response, route: Route): any {
        return {
            something: function(){
                console.log("teste");
            }
        }
    }
}

Injection.register(new IndexInjectable);

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
    const baseUrl = `http://localhost:${port}`;
    axios.get(`${baseUrl}/test`).then(r => console.log(r.data))
    axios.post(`${baseUrl}/test`).then(r => console.log(r.data))
    axios.get(`${baseUrl}/test/299`).then(r => console.log(r.data))
    axios.put(`${baseUrl}/test/299`).then(r => console.log(r.data))
    axios.delete(`${baseUrl}/test/299`).then(r => console.log(r.data))
})