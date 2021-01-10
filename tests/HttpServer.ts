import { HttpApp } from "../src"
import AuthMiddleware from "./AuthMiddleware";


export default class HttpServer extends HttpApp {

    protected routeMiddleware: any = {
        'auth': AuthMiddleware
    }

    protected onStart() {
        console.log(`Example app listening at http://localhost:${this.port}`);
    }
}