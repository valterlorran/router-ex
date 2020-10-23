
import { Router } from "../src/index";

import { NextFunction, Request, Response } from "../src/index";
import IndexController from './IndexController';
import express from 'express';

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