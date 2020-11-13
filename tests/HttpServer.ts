import { HttpApp } from "../src"


export default class HttpServer extends HttpApp {

    protected onStart() {
        console.log(`Example app listening at http://localhost:${this.port}`);
    }
}