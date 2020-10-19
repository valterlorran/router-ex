
import { Router } from "../src/index";

import express, {NextFunction, Request, Response} from "express";
import IndexController from './IndexController';

const app = express();
const port = 3000;

const router = new Router(app);

router.get('/index', [IndexController, 'index']).middleware(
    (request: Request, response: Response, next: NextFunction)=>{
        return next();
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})