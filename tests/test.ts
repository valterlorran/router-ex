
import { Router } from "../src/index";

import { NextFunction, Request, Response } from "../src/index";
import IndexController from './IndexController';
import express from 'express';
import TestController from "./TestController";
import axios from "axios";

const app = express();
const port = 3000;

const router = new Router(app);

router.resource('/test', TestController);

router.get('/index', [IndexController, 'index']).middleware(
    (request: Request, response: Response, next: NextFunction)=>{
        return next();
    }
);

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
    const baseUrl = `http://localhost:${port}`;
    axios.get(`${baseUrl}/test`).then(r => console.log(r.data))
    axios.post(`${baseUrl}/test`).then(r => console.log(r.data))
    axios.get(`${baseUrl}/test/299`).then(r => console.log(r.data))
    axios.put(`${baseUrl}/test/299`).then(r => console.log(r.data))
    axios.delete(`${baseUrl}/test/299`).then(r => console.log(r.data))
})