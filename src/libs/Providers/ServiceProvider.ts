import BaseApp from "libs/Base/BaseApp";

export default class ServiceProvider {
    protected app: BaseApp;

    constructor(app: BaseApp) {
        this.app = app;
    }
}