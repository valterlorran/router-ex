import { App } from "libs/Base/App";

export default class ServiceProvider {
    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    public boot() {}
}